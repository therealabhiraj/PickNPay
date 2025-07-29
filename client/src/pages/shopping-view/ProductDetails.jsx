import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_API_URL, PYTHON_RECOMMENDER_API_BASE_URL } from "../../config";

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductAndRecommendations() {
      setLoading(true);
      setError(null);
      try {
        const productRes = await axios.get(`${BASE_API_URL}/api/shop/products/${productId}`);
        if (productRes.data.success) {
          setProduct(productRes.data.data);
        } else {
          setError(productRes.data.message || "Could not load product details.");
          setLoading(false);
          return;
        }

        const recsRes = await axios.get(`${PYTHON_RECOMMENDER_API_BASE_URL}/recommendations/${productId}`);
        if (Array.isArray(recsRes.data)) {
          setRecommendations(recsRes.data);
        } else {
          console.warn("Recommendations API did not return an array or success was not true:", recsRes.data);
          setRecommendations([]);
        }

      } catch (err) {
        console.error("Failed to fetch product or recommendations:", err);
        setError(err.response?.data?.message || "Failed to load details or recommendations due to a network or server error.");
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      fetchProductAndRecommendations();
    }
  }, [productId]);

  if (loading) return <div style={{ textAlign: 'center', padding: '20px' }}>Loading product details and recommendations...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>Error: {error}</div>;

  if (!product) return <div style={{ textAlign: 'center', padding: '20px' }}>Product not found.</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '10px' }}>{product.title}</h1>
      <p style={{ fontSize: '1.1em', color: '#555' }}>{product.description}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Price:</strong> ${product.price?.toFixed(2)}</p>
      {product.salePrice && <p style={{ color: 'green' }}><strong>Sale Price:</strong> ${product.salePrice?.toFixed(2)}</p>}
      <p><strong>Stock:</strong> {product.totalStock}</p>

      <hr style={{ margin: '30px 0' }} />

      <h2 style={{ marginBottom: '20px' }}>Recommended for you:</h2>
      {recommendations.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {recommendations.map((rec) => (

            <div key={rec._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
              <h3 style={{ margin: '0 0 10px', fontSize: '1.2em' }}>

                <Link to={`/shop/product/${rec._id}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                  {rec.title}
                </Link>
              </h3>
              <p style={{ margin: '0 0 5px', color: '#666' }}>{rec.category}</p>
              <p style={{ fontWeight: 'bold' }}>${rec.price?.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: '#888' }}>No specific recommendations available at this time.</p>
      )}
    </div>
  );
}

export default ProductDetails;