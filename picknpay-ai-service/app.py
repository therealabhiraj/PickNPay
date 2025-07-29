
import os
from flask import Flask, request, jsonify
from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import pandas as pd
from dotenv import load_dotenv



load_dotenv()

app = Flask(__name__)


MONGO_URI = os.getenv("MONGO_DB_URL")
if not MONGO_URI:
    print("Error: MONGO_DB_URL environment variable not set for Python service.")
    raise ValueError("MONGO_DB_URL environment variable is required.")

client = MongoClient(MONGO_URI)
db = client.get_database() 

products_collection = db.products 

products_df = pd.DataFrame()
tfidf_vectorizer = None
tfidf_matrix = None

def load_products_and_prepare_recommender():
    global products_df, tfidf_vectorizer, tfidf_matrix
    print("Attempting to load products for recommender...")
    try:
        products_cursor = products_collection.find({})
        products = list(products_cursor)
        if not products:
            print("No products found in the database. Recommender will be empty.")
            products_df = pd.DataFrame()
            tfidf_vectorizer = None
            tfidf_matrix = None
            return

        products_df = pd.DataFrame(products)
        products_df['_id'] = products_df['_id'].astype(str)

        products_df['features'] = products_df['category'] + ' ' + products_df['description'].fillna('') + ' ' + products_df['brand'].fillna('')
        
        tfidf_vectorizer = TfidfVectorizer(stop_words='english')
        tfidf_matrix = tfidf_vectorizer.fit_transform(products_df['features'])
        print(f"Successfully loaded {len(products_df)} products and prepared recommender.")
    except Exception as e:
        print(f"Error loading products for recommender: {e}")
        products_df = pd.DataFrame()
        tfidf_vectorizer = None
        tfidf_matrix = None

with app.app_context():
    load_products_and_prepare_recommender()


@app.route('/recommendations/<product_id>', methods=['GET'])
def get_recommendations(product_id):
    if products_df.empty or tfidf_vectorizer is None or tfidf_matrix is None:
        print("Recommender data missing/empty, attempting reload.")
        load_products_and_prepare_recommender() 
        if products_df.empty: 
            return jsonify({"message": "No products available for recommendations after reload attempt."}), 500


    try:
        idx = products_df[products_df['_id'] == product_id].index[0]
    except IndexError:
        return jsonify({"message": "Product not found for recommendations."}), 404

    cosine_similarities = linear_kernel(tfidf_matrix[idx:idx+1], tfidf_matrix).flatten()

    similar_indices = cosine_similarities.argsort()[:-6:-1] 

    recommended_products = []
    for i in similar_indices:
        if i == idx: 
            continue
        
        product_dict = products_df.iloc[i].to_dict()
        
        if '_id' in product_dict:
            product_dict['_id'] = str(product_dict['_id'])
        
        recommended_products.append(product_dict)
        if len(recommended_products) >= 5:
            break

    return jsonify(recommended_products)

@app.route('/health', methods=['GET'])
def health_check():
    try:
        client.admin.command('ping') 
        return jsonify({"status": "healthy", "db_connected": True}), 200
    except Exception as e:
        print(f"Health check failed: {e}")
        return jsonify({"status": "unhealthy", "db_connected": False, "error": str(e)}), 500

if __name__ == '__main__':
    
    app.run(host='0.0.0.0', port=5001, debug=True)