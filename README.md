# PickNPay: Seamless E-commerce with Intelligent Product Discovery and Role-Based Access Control

![PickNPay Banner](https://via.placeholder.com/1200x400/0000FF/FFFFFF?text=PickNPay+E-commerce+Platform) ![PickNPay Logo](https://via.placeholder.com/150/0000FF/FFFFFF?text=PickNPay+Logo) **Project Title and Description:**
PickNPay is a cutting-edge e-commerce application designed to revolutionize the online shopping experience. It combines robust standard e-commerce functionalities with an advanced, AI-powered product recommendation system and **comprehensive Role-Based Access Control (RBAC)**. This platform provides distinct experiences for **customers (users)** who shop and **administrators** who manage products and other backend operations, making product discovery effortless and enjoyable by suggesting items tailored to customer interests, while empowering admins with full control.
## Table of Content

[**Visuals and Demo**](#visuals-and-demo)
* [**Features**](#features)
* [**Technologies Used**](#technologies-used)
* [**Project Architecture**](#project-architecture)
* [**Interaction Flow**](#interaction-flow)
* [**Installation and Local Setup**](#installation-and-local-setup)
    * [Prerequisites](#prerequisites)
    * [Clone the Repository](#clone-the-repository)
    * [Environment Variables](#environment-variables)
    * [Database Setup (MongoDB)](#database-setup-mongodb)
    * [Run the Backend Services](#run-the-backend-services)
    * [Run the Frontend Application](#run-the-frontend-application)
* [**Usage**](#usage)
* [**API Endpoints**](#api-endpoints)
* [**Deployment**](#deployment)
* [**Future Enhancements**](#future-enhancements)
* [**Contributing**](#contributing)
* [**License**](#license)
* [**Contact**](#contact)

## Visuals and Demo


## Features

* **Comprehensive User Authentication:**
    * Secure user registration and login for both customer and admin roles.
    * Session management using JSON Web Tokens (JWT).
    * Password hashing with `bcryptjs` for robust security.
    
* **Role-Based Access Control (RBAC):**
    * Distinct user roles: **Customer** (for shopping) and **Admin** (for management).
    * Restricted access to specific routes## Features

* **Comprehensive User Authentication:**
    * Secure user registration and login for both customer and admin roles.
    * Session management using JSON Web Tokens (JWT).
    * Password hashing with `bcryptjs` for robust security.

* **Role-Based Access Control (RBAC):**
    * Distinct user roles: **Customer** (for shopping) and **Admin** (for management).
    * Restricted access to specific routes and functionalities based on user role.

* **Dynamic Product Catalog:**
    * Browse a diverse range of products categorized for easy navigation.
    * Detailed product pages displaying descriptions, prices, availability, and images.
    * Filtering, sorting, and search functionalities to find products quickly.

* **Intuitive Shopping Cart Management:**
    * Seamlessly add products to the shopping cart.
    * Update quantities of items in the cart.
    * Remove items from the cart.
    * View cart summary and total.

* **Customer Reviews and Ratings:**
    * Users can submit text-based reviews and star ratings for purchased products.
    * Display of average ratings and individual reviews on product pages.

* **AI-Powered Product Recommendations:**
    * Content-based filtering using TF-IDF (Term Frequency-Inverse Document Frequency) to analyze product descriptions, categories, and brands.
    * Suggests similar products to the one currently being viewed, enhancing user discovery and cross-selling opportunities.
    * Recommendations are fetched from a dedicated Python service for scalability and modularity.

* **Admin Product Management:**
    * Dedicated interface/routes for administrators to:
        * **Add new products** to the catalog.
        * **Edit existing product details** (price, description, stock, etc.).
        * **Delete products** from the catalog.
        * User management, order management, and other administrative tasks.

* **Secure Payment Gateway Integration:**
    * Integration with popular payment services (e.g., PayPal Sandbox) for secure and flexible transaction processing.
    * Supports various payment methods, ensuring a smooth and trusted checkout experience.

* **Intelligent Chatbot Support:**
    * An AI-powered conversational agent, built using Google SDK (e.g., Dialogflow, Gemini API), to provide instant customer support.
    * Assists users with FAQs, product inquiries, and general navigation, enhancing the overall user experience.

* **Robust Backend APIs:**
    * Separate Node.js/Express.js service for core e-commerce logic, including secure admin routes.
    * Dedicated Python/Flask service for AI recommendation processing.
    * Ensures efficient data handling and communication between services.

* **Media Management with Cloudinary:**
    * Leverages Cloudinary for efficient cloud-based storage, optimization, and delivery of all media assets, such as product images, ensuring fast loading times and scalability.

* **Responsive User Interface:**
    * Built with React.js and styled with Tailwind CSS and Shadcn/ui for a modern, responsive, and intuitive user experience across devices for both customer and admin views.
 and functionalities based on user role.
* **Dynamic Product Catalog:**
    * Browse a diverse range of products categorized for easy navigation.
    * Detailed product pages displaying descriptions, prices, availability, and images.
    * Filtering, sorting, and search functionalities to find products quickly.
* **Intuitive Shopping Cart Management:**
    * Seamlessly add products to the shopping cart.
    * Update quantities of items in the cart.
    * Remove items from the cart.
    * View cart summary and total.
* **Customer Reviews and Ratings:**
    * Users can submit text-based reviews and star ratings for purchased products.
    * Display of average ratings and individual reviews on product pages.
* **AI-Powered Product Recommendations:**
    * Content-based filtering using TF-IDF (Term Frequency-Inverse Document Frequency) to analyze product descriptions, categories, and brands.
    * Suggests similar products to the one currently being viewed, enhancing user discovery and cross-selling opportunities.
    * Recommendations are fetched from a dedicated Python service for scalability and modularity.
* **Admin Product Management:**
    * Dedicated interface/routes for administrators to:
        * **Add new products** to the catalog.
        * **Edit existing product details** (price, description, stock, etc.).
        * **Delete products** from the catalog.
        *  User management, order management, etc.
* **Robust Backend APIs:**
    * Separate Node.js/Express.js service for core e-commerce logic, including secure admin routes.
    * Dedicated Python/Flask service for AI recommendation processing.
    * Ensures efficient data handling and communication between services.
* **Responsive User Interface:**
    * Built with React.js and styled with Tailwind CSS and Shadcn/ui for a modern, responsive, and intuitive user experience across devices for both customer and admin views.
## Technologies Used

This project leverages a modern tech stack across its three main services:

* **Frontend (Built with React.js & Vite):**
    * [**React.js (v18.x)**](https://react.dev/): A declarative, component-based JavaScript library for building user interfaces. Chosen for its efficiency in handling dynamic UIs.
    * [**Vite (v5.x)**](https://vitejs.dev/): A next-generation frontend tooling that provides an extremely fast development experience with Hot Module Replacement (HMR) and optimized builds.
    * [**Tailwind CSS (v3.x)**](https://tailwindcss.com/): A utility-first CSS framework for rapidly building custom designs without leaving your HTML. Offers high flexibility and performance.
    * [**Shadcn/ui**](https://ui.shadcn.com/): A collection of beautifully designed React components that you can copy and paste into your apps. Built with Radix UI and Tailwind CSS.
    * [**Axios (v1.x)**](https://axios-http.com/): A promise-based HTTP client for the browser and Node.js, used for making API requests from the frontend to both backend services.

* **Backend (Core API - Node.js/Express.js):**
    * [**Node.js (v22.16.0)**](https://nodejs.org/en): A JavaScript runtime environment that executes JavaScript code outside a web browser, ideal for building scalable network applications.
    * [**Express.js (v4.x)**](https://expressjs.com/): A fast, unopinionated, minimalist web framework for Node.js, used for building the RESTful API endpoints.
    * [**Mongoose (v8.x)**](https://mongoosejs.com/): An elegant MongoDB object modeling tool for Node.js. It provides a straightforward, schema-based solution to model your application data.
    * [**JSON Web Tokens (JWT)**](https://jwt.io/): A compact, URL-safe means of representing claims to be transferred between two parties, primarily used for stateless authentication and authorization.
    * [**Bcrypt.js (v2.4.x)**](https://github.com/dcodeIO/bcrypt.js): A library for hashing passwords, ensuring secure storage of user credentials.
    * [**Dotenv (v16.x)**](https://www.npmjs.com/package/dotenv): A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
    * [**CORS (v2.8.x)**](https://expressjs.com/en/resources/middleware/cors.html): An Express middleware to enable Cross-Origin Resource Sharing, allowing your frontend to safely make requests to your backend.
    * [**Multer**](https://expressjs.com/en/resources/middleware/multer.html): Node.js middleware for handling `multipart/form-data`, primarily used for managing file uploads (e.g., product images).
    * [**Cloudinary**](https://cloudinary.com/): A cloud-based image and video management service, integrated for efficient storage, optimization, and delivery of media assets like product images.
    * *(If implemented)* [**Nodemailer (v6.x)**](https://nodemailer.com/about/): A module for Node.js applications to allow easy email sending.
    * [**Stripe (v15.x)**](https://stripe.com/): The official Node.js library for integrating Stripe's payment processing services. (You mentioned PayPal, so I'll add that under payments).

* **Backend (AI Recommendation Service - Python/Flask):**
    * [**Python (v3.10.13)**](https://www.python.org/): A versatile and powerful programming language, perfect for data science and machine learning tasks.
    * [**Flask (v2.3.x)**](https://flask.palletsprojects.com/): A lightweight WSGI web application framework for Python, used for quickly setting up the recommendation API.
    * [**scikit-learn (v1.3.x)**](https://scikit-learn.org/stable/): A free software machine learning library for the Python programming language, featuring various classification, regression and clustering algorithms, including TF-IDF and cosine similarity.
    * [**Pandas (v2.0.x)**](https://pandas.pydata.org/): A fast, powerful, flexible, and easy-to-use open-source data analysis and manipulation tool, built on top of the Python programming language.
    * [**PyMongo (v4.5.x)**](https://pymongo.readthedocs.io/en/stable/): The official PyMongo driver for MongoDB in Python, enabling seamless interaction with the database.
    * [**Flask-Cors (v4.0.x)**](https://flask-cors.readthedocs.io/en/latest/): A Flask extension for handling Cross-Origin Resource Sharing (CORS), enabling secure communication with the frontend.
    * [**python-dotenv (v1.0.x)**](https://pypi.org/project/python-dotenv/): Reads key-value pairs from a `.env` file and sets them as environment variables.

* **Database:**
    * [**MongoDB Atlas**](https://www.mongodb.com/atlas): A flexible, document-oriented NoSQL database that provides high performance, high availability, and easy scalability. Cloud-hosted for convenience.

* **Payment Gateways & Chatbot:**
    * [**PayPal API**](https://developer.paypal.com/): Integrated for secure and versatile payment processing, enabling users to pay with their PayPal accounts.
    * **Chatbot (powered by Google SDK):** An intelligent conversational agent implemented to provide instant customer support, answer FAQs, and assist with product inquiries, enhancing the user experience. (You'll need to specify which Google SDK if it's more specific than a general "Google SDK for chatbot," e.g., Dialogflow, Vertex AI, etc., or I can leave it general).
## Project Architecture

PickNPay employs a **microservices-like architecture**, a strategic choice to ensure a highly scalable, maintainable, and flexible system. By separating core functionalities into distinct, yet interconnected, services, we achieve clear separation of concerns, allowing for independent development, deployment, and scaling of individual components. This approach significantly enhances the system's resilience and adaptability to evolving business requirements.

The architecture comprises three primary services:

1.  **Frontend (React Application):**
    * **Purpose:** This service is the user-facing layer of PickNPay, delivering a rich and interactive experience for both customers Browse products and administrators managing the store.
    * **Responsibilities:**
        * **User Interface Rendering:** Dynamically builds and displays all web pages, product listings, shopping carts, user profiles, and administrative dashboards.
        * **Client-Side Logic:** Manages application state, handles user interactions, and implements client-side routing to provide a Single Page Application (SPA) experience.
        * **API Orchestration:** Serves as the central point for making direct HTTP requests to both the Node.js Backend (for core e-commerce operations) and the Python AI Recommendation Service (for product suggestions).
        * **Role-Based View:** Intelligently adapts its UI and navigation elements based on the authenticated user's role (customer or admin), displaying relevant dashboards and features.
    * **Benefits:** Decoupling the frontend allows for independent UI development cycles, faster iteration on user experience, and the flexibility to adopt new frontend technologies without impacting backend logic.

2.  **Node.js Backend (Core API Service):**
    * **Purpose:** This is the robust central nervous system of the e-commerce platform, handling all core business logic and data management that doesn't specifically involve AI recommendations.
    * **Responsibilities:**
        * **User Management:** Manages comprehensive user authentication (registration, login, password hashing with `bcrypt.js`, and session management using JWTs) for both customer and administrator accounts.
        * **Product Catalog Management:** Provides endpoints for CRUD (Create, Read, Update, Delete) operations on products, categories, and inventory. This includes features like product search, filtering, and sorting.
        * **Shopping Cart & Order Processing:** Manages the lifecycle of user shopping carts, order creation, and status updates.
        * **Customer Reviews & Ratings:** Handles the submission, storage, and retrieval of product reviews and ratings.
        * **Secure API Endpoints:** Implements robust JWT-based authentication and authorization middleware to protect all sensitive routes, especially those intended for administrators.
        * **Data Persistence:** Interacts directly with the MongoDB database using Mongoose ORM to store and retrieve all e-commerce-related data.
        * **Media Handling:** Integrates with services like Multer for file uploads and Cloudinary for efficient cloud-based storage and delivery of product images and other media assets.
        * **Payment Orchestration:** Integrates with payment gateways like PayPal and potentially Stripe, securely processing transactions and updating order statuses.
    * **Benefits:** Centralizing core business logic ensures data consistency and provides a single source of truth for e-commerce operations. Its independence allows for focused development on transactional features and security, and it can be scaled separately from the UI or AI components.

3.  **Python AI Recommendation Service:**
    * **Purpose:** A specialized, high-performance Flask application dedicated solely to generating intelligent product recommendations, enhancing user engagement and sales.
    * **Responsibilities:**
        * **Data Ingestion & Processing:** Periodically (or on-demand) fetches relevant product data (descriptions, categories, brands) directly from the MongoDB database.
        * **Recommendation Model:** Utilizes `scikit-learn` to build and query a content-based filtering model, primarily employing TF-IDF (Term Frequency-Inverse Document Frequency) to identify product similarities.
        * **Recommendation API:** Exposes a simple, efficient RESTful API endpoint that the Frontend calls, providing it with a product ID to receive a list of highly relevant, similar product recommendations.
    * **Benefits:** Isolating the AI service allows for:
        * **Language Suitability:** Python is ideal for data science and machine learning tasks.
        * **Independent Scaling:** The recommendation engine can be scaled independently based on the computational load of generating recommendations, without impacting the core e-commerce API.
        * **Modularity & Iteration:** Changes or improvements to the recommendation algorithms can be deployed without affecting the main backend or frontend.
### Detailed Interaction Flow:

The services communicate asynchronously via HTTP/REST API calls, fostering a loosely coupled and resilient system. This design minimizes dependencies between services, improving overall system performance and maintainability.

1.  **Client-Core API Communication (Frontend to Node.js Backend):**
    * **Initiation:** The **Frontend (React App)** serves as the primary initiator of requests for most e-commerce functionalities. This includes user actions like:
        * **Authentication:** Sending user credentials (username, password) to the Node.js Backend's authentication endpoints (e.g., `/api/auth/login`, `/api/auth/register`).
        * **Product Browse:** Fetching product lists (e.g., `/api/products`), product details (e.g., `/api/products/{id}`), and performing searches/filters.
        * **Shopping Cart Management:** Adding, updating, or removing items from the cart (e.g., `/api/cart`), and retrieving cart contents.
        * **Order Placement:** Submitting order details and initiating payment processing (e.g., `/api/orders`).
        * **Reviews:** Submitting new product reviews or fetching existing ones (e.g., `/api/products/{id}/reviews`).
        * **Admin Operations:** For authenticated administrators, accessing protected routes for product CRUD operations, user management, and order fulfillment (e.g., `/api/admin/products`, `/api/admin/users`).
    * **Data Format:** All communication is handled via standard HTTP methods (GET, POST, PUT, DELETE) with request bodies and responses typically formatted as **JSON data**.
    * **Frontend Action:** Upon receiving JSON responses, the React App dynamically updates the user interface, reflecting the latest data (e.g., displaying products, updating cart totals, showing order confirmations).

2.  **Client-AI Service Communication (Frontend to Python AI Recommendation Service):**
    * **Trigger:** When a user navigates to a **product detail page** on the Frontend, or potentially on the homepage for personalized recommendations, the Frontend triggers a request.
    * **Request:** The **Frontend (React App)** directly sends an HTTP GET request to the **Python AI Recommendation Service**'s dedicated API endpoint, typically including the `productId` of the currently viewed item (e.g., `GET /recommendations/{productId}`).
    * **AI Processing:** The Python AI Service receives this request, processes it using its TF-IDF model, and identifies products most similar to the provided `productId`.
    * **Response & Subsequent Action:** The AI service returns a lightweight JSON array containing only the **IDs of the recommended products**. The Frontend then uses these IDs to make *subsequent, targeted requests* to the **Node.js Backend** (e.g., `GET /api/products?ids={id1},{id2},{id3}`) to fetch the full product details (images, prices, names) for display. This two-step process keeps the AI service focused on recommendation logic and avoids large data transfers from it.

3.  **Backend-Database Interaction (Node.js & Python to MongoDB Atlas):**
    * **Direct Connections:** Both the **Node.js Backend** and the **Python AI Recommendation Service** establish and maintain their own direct connections to the **MongoDB Atlas Database**.
    * **Node.js Backend (Core Data Operations):** Primarily responsible for **transactional reads and writes**. This includes:
        * Creating and updating user profiles, product inventory, order details, and review submissions.
        * Querying for real-time data needed for user sessions (e.g., current cart, specific product details for checkout).
        * Utilizes Mongoose for schema enforcement and simplified ODM operations.
    * **Python AI Service (Analytical Data Access):** Primarily responsible for **reading product data** for its recommendation model. This involves:
        * Reading product descriptions, categories, and brands to build and update its TF-IDF matrices.
        * Performing efficient queries to retrieve specific product information required for generating recommendations.
        * Utilizes PyMongo for native Python interaction with MongoDB.
    * **Rationale:** This direct access pattern for both backends ensures efficient data flow for their respective, distinct concerns. The Node.js backend handles the dynamic, transactional state, while the Python service can independently update its analytical models without burdening the core API with large data transfers for model training.

4.  **Role-Based Access Control (RBAC) Flow:**
    * **Login & JWT Issuance:** When a user successfully logs in via the **Frontend** to the **Node.js Backend**, the backend authenticates their credentials. Upon successful authentication, a **JSON Web Token (JWT)** is generated. This JWT's payload securely embeds key user information, critically including their `role` (e.g., "customer" or "admin").
    * **Client-Side Storage:** The Node.js Backend sends this JWT back to the Frontend. The Frontend then securely stores this token (e.g., in `localStorage` or `HttpOnly` cookies, depending on the security strategy).
    * **Authorized Requests:** For every subsequent request to protected routes on the **Node.js Backend** (e.g., accessing user profiles, making purchases, or any admin action), the Frontend includes this JWT in the `Authorization` header (e.g., `Authorization: Bearer <your-jwt>`).
    * **Backend Validation & Authorization:** The Node.js Backend intercepts incoming requests. It first **validates the integrity and authenticity of the JWT** (checking the signature, expiration, etc.). If valid, it extracts the `role` from the token's payload. Based on this role, the backend's middleware then **authorizes or denies** access to the requested resource. For instance, only requests with an 'admin' role in their JWT would be permitted to access `/api/admin/*` endpoints.
    * **Frontend UI Adaptation:** The Frontend also leverages the `role` information extracted from the JWT (or received during login). This enables it to conditionally render UI elements:
        * Displaying an "Admin Dashboard" link only to users with an 'admin' role.
        * Showing or hiding "Edit Product" or "Delete Product" buttons based on user permissions.
        * Adjusting navigation menus and accessible features dynamically, providing a tailored user experience.

This comprehensive architectural design, with its distinct services and well-defined interaction protocols, forms a robust, performant, and scalable foundation for the PickNPay e-commerce platform, capable of handling complex functionalities and evolving requirements.



## FlowChart

+------------------+
|      START       |
|   (User Opens    |
|    PickNPay)     |
+--------+---------+
         |
         v
+------------------+
|    Frontend      |
| (Display Home,   |
|   Product List)  |
+--------+---------+
         |
         | (HTTP GET /api/products)
         +-------------------------------------------------+
         |                                                 |
         v                                                 v
+------------------+                              +-----------------------+
|  Node.js Backend |                              |    MongoDB Database   |
| (Fetches Product |<-----------------------------|(Stores Product, User, |
|    Data from     |                              |     Order Data)       |
|    MongoDB)      |----------------------------->|                       |
+--------+---------+                              +-----------------------+
         |
         | (Renders Products)
         v
+------------------+
|    Frontend      |
| (User Browses    |
|  Products)       |
+--------+---------+
         |
         | (User Clicks Product Detail)
         v
+------------------+
|    Frontend      |
| (Display Product |
|    Details)      |
+--------+---------+
         |
         | (HTTP GET /recommendations/{productId})
         +--------------------------------------------------------+
         |                                                        |
         v                                                        v
+---------------------------+                              +-----------------------+
|  Python AI Recommendation |<-----------------------------|(Reads Product Data   |
|       Service             |                              |  for Recommendations)|
|   (Calculates & Returns   |----------------------------->|                       |
|  Recommended Product IDs) |                              +-----------------------+
+--------+------------------+
         |
         | (Recommended Product IDs)
         v
+------------------+
|    Frontend      |
| (Gets Full Product|
|Details from Backend|
|  via /api/products?ids=) |
+--------+---------+
         |
         | (Adds/Updates/Removes Item)
         v
+------------------+
|    Frontend      |
| (Shopping Cart   |
|    Management)   |
+--------+---------+
         |
         | (HTTP POST/PUT /api/cart)
         +-------------------------------------------------+
         |                                                 |
         v                                                 v
+------------------+                              +-----------------------+
|  Node.js Backend |                              |    MongoDB Database   |
| (Updates Cart in |<-----------------------------|(Updates Cart Data)    |
|    MongoDB)      |----------------------------->|                       |
+--------+---------+                              +-----------------------+
         |
         | (Proceed to Checkout)
         v
+------------------+
|    Frontend      |
| (Initiates Checkout/|
|    Payment)      |
+--------+---------+
         |
         | (HTTP POST /api/orders, Interacts with PayPal/Stripe)
         +-------------------------------------------------+
         |                                                 |
         v                                                 v
+------------------+                              +-----------------------+
|  Node.js Backend |                              |    MongoDB Database   |
| (Processes Order,|<-----------------------------|(Saves Order Details)  |
|   Confirms Payment) |----------------------------->|                       |
+--------+---------+                              +-----------------------+
         |
         v
+------------------+
|    Frontend      |
| (Displays Order  |
|  Confirmation)   |
+--------+---------+
         |
         v
+------------------+
|       END        |
+------------------+
## Installation and Local Setup

**Installation and Local Setup:**

To set up PickNPay on your local machine, follow these detailed steps. Ensure you have all prerequisites installed.

### Prerequisites

* **Node.js:** It is highly recommended to use Node.js `v20.x` or `v22.x`. You can download the installer from [nodejs.org](https://nodejs.org/).
* **npm:** Comes bundled with Node.js. Ensure you have a recent version by running `npm -v` in your terminal.
* **Python:** Install Python `3.9` or higher. For best compatibility with the AI service, `3.10.13` (as used in deployment) is recommended. Download from [python.org/downloads](https://www.python.org/downloads/).
* **pip:** Python's package installer. Usually comes with Python. You can upgrade it by running: `python -m pip install --upgrade pip`.
* **MongoDB:**
    * **Local Installation:** Download and install MongoDB Community Server from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community). Ensure the MongoDB service is running on your machine.
    * **Cloud-Hosted (Recommended):** Set up a free tier cluster on [MongoDB Atlas](https://www.mongodb.com/atlas). This is generally easier for managing connections and provides a robust, accessible database.

### Clone the Repository

First, clone the project from GitHub to your local machine:

```bash
git clone [https://github.com/therealabhiraj/PickNPay.git](https://github.com/therealabhiraj/PickNPay.git)
cd PickNPay
``` 
 
### Configure Environment Variables
Each service requires specific environment variables for configuration, database connections, API keys, and secrets. You will create `.env` files in the root directory of each respective service. **Do not commit these `.env` files to your version control (Git)!**

### a. Node.js Backend (`backend/.env`)

Navigate to the `backend` directory and create a file named `.env`:

```bash
cd backend
touch .env 
```

#### Node.js Backend Server Port
```bash
PORT=5000
```
#### MongoDB Connection String (from MongoDB Atlas or local installation)
```bash
MONGO_DB_URL="mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@yourcluster.mongodb.net/picknpay_db?retryWrites=true&w=majority"
```
#### Example for local MongoDB: 
```bash
MONGO_DB_URL="mongodb://localhost:27017/picknpay_db"
```

### Secret key for JWT token generation and verification.
#### IMPORTANT: Use a very strong, long, and random string for production.
```bash
JWT_SECRET="YOUR_VERY_STRONG_AND_RANDOM_SECRET_KEY"
```
#### Cloudinary Credentials for Image Uploads
```bash
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
```
##### Note: CLOUDINARY_UPLOAD_PRESET is typically used client-side for unsigned uploads or configured via code/backend for signed uploads.


#### PayPal API Credentials (for server-side interactions)
```bash
PAYPAL_MODE="sandbox" # or "live" for production
PAYPAL_CLIENT_ID="your_paypal_client_id_from_paypal_developer"
PAYPAL_CLIENT_SECRET="your_paypal_client_secret_from_paypal_developer"
```

#### Optional: Stripe API Key (if payment gateway is integrated)
```bash
STRIPE_SECRET_KEY="sk_test_YOUR_STRIPE_SECRET_KEY" # Your Stripe secret key for test mode.
```

#### Optional: Gemini API Key (if your backend directly uses Gemini for any feature)
```bash
GEMINI_API_KEY="your_gemini_api_key"
```

## How to get these values:

1. #### MONGO_DB_URL:

a. Log in to your MongoDB Atlas account.

b. Navigate to "Database" on the left sidebar.

c. Find your cluster and click "Connect".

d. Choose "Connect your application".

e. Select your driver (e.g., "Node.js") and copy the connection string. Remember to replace `<username>`, `<password>`, and optionally `<dbname>` (e.g., picknpay_db) in the URI. Ensure you have created a database user with appropriate permissions in MongoDB Atlas.

2. #### JWT_SECRET:

This should be a long, random, and complex string. You can generate one online (search for "online JWT secret key generator") or use a command-line tool. Do not use a simple or predictable string.

3. #### CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET:

  a. Sign up or log in to Cloudinary.

b. On your Cloudinary dashboard, you'll find your Cloud Name, API Key, and API Secret.

4. #### PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET:

a. Log in to your PayPal Developer Dashboard.

b. Select "My Apps & Credentials".

c. Toggle between "Sandbox" (for testing) and "Live" (for production) depending on your PAYPAL_MODE.

d. Create a "REST API app" (or use an existing one) to obtain the Client ID and Secret.


5. #### GEMINI_API_KEY :

a. Visit Google AI Studio.

b. Log in with your Google account.

c. Click "Get API key in Google AI Studio" or "Create API key in new project".

d.    Copy the generated key.

### b. frontend `(frontend/.env)`


**Navigate to the frontend directory and create a file named .env:**


```bash
cd ../frontend
touch .env
```
Open `frontend/.env` and add the following variables. Ensure these match the ports your backend services will run on.
```bash
# Base URL for the Node.js Backend API
VITE_REACT_APP_NODE_API_URL="http://localhost:5000/api"

# Base URL for the Python AI Recommendation Service
VITE_REACT_APP_AI_SERVICE_URL="http://localhost:5001" # Note: No /api needed here typically if Flask is serving directly

# Cloudinary Credentials for direct client-side image uploads (if used for unsigned uploads)
VITE_REACT_APP_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
VITE_REACT_APP_CLOUDINARY_UPLOAD_PRESET="your_cloudinary_upload_preset"

# PayPal Client ID for client-side integration (if used for buttons, etc.)
VITE_REACT_APP_PAYPAL_CLIENT_ID="your_paypal_client_id_from_paypal_developer"
```
**Note:** Vite requires environment variables to be prefixed with VITE_ to be exposed to the client-side code. The `CLOUDINARY_CLOUD_NAME` and `PAYPAL_CLIENT_ID` for the frontend should be the same as their counterparts used by the backend.

**VITE_REACT_APP_CLOUDINARY_UPLOAD_PRESET:** Go to your `Cloudinary dashboard` -> `Settings` -> `Upload tab`. Scroll down to `"Upload presets"`. You can create a new unsigned upload preset or use an existing one. The `"Name"` field of this preset is your `CLOUDINARY_UPLOAD_PRESET`. This is crucial for direct client-side uploads without backend authentication.

## c. Python AI Recommendation Service (ai-service/.env)
Navigate to the ai-service directory and create a file named .env:


```bash
cd ../ai-service
touch .env
```
Open `ai-service/.env` and add the following variables:

### MongoDB Atlas Connection String for AI Service
```bash 
MONGO_DB_URL="mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@yourcluster.mongodb.net/picknpay_db?retryWrites=true&w=majority"

# Port for the Flask AI Recommendation Service
FLASK_RUN_PORT=5001 
```

**Note:** This MONGO_DB_URL should be the same as the one used by your Node.js backend, as both services access the same database.

## 3. Install Dependencies
Now, install the necessary dependencies for each service.

#### a. Node.js Backend
```bash
cd backend # Ensure you are in the 'backend' directory
npm install
```

#### b. React Frontend
```bash
cd frontend # Ensure you are in the 'frontend' directory
npm install
```
#### c. Python AI Recommendation Service
```bash
cd ai-service # Ensure you are in the 'ai-service' directory

# It's highly recommended to create and activate a Python virtual environment
python -m venv venv
# On Windows (Command Prompt/PowerShell):
.\venv\Scripts\activate
# On macOS/Linux/Git Bash:
source venv/bin/activate

# Install dependencies from requirements.txt
pip install -r requirements.txt
```
**Note:** If requirements.txt does not exist in your ai-service directory, you might need to create it manually after installing the dependencies:
```bash
pip freeze > requirements.txt
```
**Common dependencies for your AI service would include** `Flask`, `scikit-learn`, `pandas`, `pymongo`, `python-dotenv`, `Flask-Cors`.

## 4. Database Setup (MongoDB)
a. Before starting the backend services, ensure your MongoDB instance is running and accessible via the `MONGO_DB_URL` you've provided in your `.env` files.

b. MongoDB Atlas Connection: Verify that your MongoDB Atlas cluster is active and that you have added your current IP address to the Network Access List. If you're working in a dynamic environment, you might temporarily set access from anywhere `(0.0.0.0/0)` for development, but remember to restrict it for production.

Initial Data / Seeding (Important): For your application to function correctly, especially the recommendation service, you will need initial product data in your MongoDB database.

If you have a seeding script:


```bash
# Example: Navigate to a script location if you have one
# cd your-project-root/scripts
# node seed-products.js # Or python seed_data.py
```
Run your seeding script according to its specific instructions.

**Otherwise (Manual Seeding):** You might need to manually insert some product documents into your `picknpay_db` database (specifically into a products collection) using a tool like MongoDB Compass or mongosh. Ensure these products have relevant fields like name, description, category, brand, etc., for the recommendation engine to process.

## 5. Run the Backend Services
Open two separate terminal windows for the backend services. It's crucial to run them concurrently for the application to function fully.

### a. Run the Node.js Backend (Core API)

**In your first terminal window:**
 1.   Navigate to the backend directory (assuming your Node.js backend code is there):


```bash
cd backend
```
2. Install dependencies (if you haven't already, or after pulling new changes):

```bash
npm install
```
3. Start the Node.js server:

```bash
npm run dev
# This command is typically configured in your package.json to use tools like Nodemon
# for auto-restarts on code changes during development.
# If 'npm run dev' is not defined in your package.json, you might try:
# node server.js
```
You should see console messages indicating the Node.js backend is running, typically listening on `http://localhost:5000` (or the `PORT` you configured in `backend/.env`). Look for output like "Server running on port 5000" or similar.

### b. Run the Python Backend (AI Recommendation Service)
**In your second terminal window:**

1. Navigate to the `ai-service directory` (assuming your Python AI code is there):

```bash
cd ai-service
```
 **2. Create and Activate a Virtual Environment:** It's highly recommended to use a Python virtual environment to manage dependencies for isolation, preventing conflicts with other Python projects.

 * Create the virtual environment (run this only once):

```bash
python -m venv venv
```
* **Activate the virtual environment:**


   * On Windows (Command Prompt/PowerShell):

```bash 
.\venv\Scripts\activate
```
   * On macOS/Linux/Git Bash:
```bash
source venv/bin/activate
```
3. **Install Python dependencies (from requirements.txt):**

```bash
pip install -r requirements.txt
```
(If `requirements.txt` doesn't exist, you'll need to create it by running `pip freeze` > `requirements.txt` after manually installing `Flask`, `scikit-learn`, `pandas`, `pymongo`, `python-dotenv`, `Flask-Cors`.)

4. **Run the Flask application:**


```bash
python app.py

# Or if your Flask app is set up to run with the 'flask' command:
# flask --app app run
```
You should see messages indicating the Flask app is serving, typically on `http://localhost:5001` (or the `FLASK_RUN_PORT` you configured). The console will also log "Successfully loaded X products and prepared recommender." after it successfully connects to MongoDB and loads product data for the recommendation model. This message confirms the AI service is ready.

## 6. Run the Frontend Application
**Open a third terminal window for the frontend.**

  **1. Navigate to the frontend directory:**

```bash
cd frontend
```
   **2. Install frontend dependencies (if you haven't already, or after pulling new changes):**

```bash
npm install
```
**3. Start the React development server:**

```bash
npm run dev
```
The Vite development server will compile your React application and typically open it automatically in your default web browser at `http://localhost:5173`. You should now be able to interact with the PickNPay application!


## Usage

Once all three services (Node.js Backend, Python AI Service, and React Frontend) are running locally as described in the Installation section, you can begin interacting with the application.

**Access the Application**
Open your web browser and navigate to the frontend's development URL: `http://localhost:5173`.

### Customer Role

As a customer, you can fully explore the shopping experience:

* **Register/Login:**

   * **New Users:** Click on the "Sign Up" or "Register" link (usually in the header or navigation) to create a new customer account. You'll typically provide an email, password, and possibly a name.

   * **Existing Users:** If you already have an account, use the "Login" functionality to access your personalized shopping experience.

*  **Browse Products:**

   * Discover the diverse range of products available. The homepage might feature popular items or new arrivals.

   * Utilize the navigation menu to browse by categories (e.g., Electronics, Apparel, Books).

   * Make use of the search bar to find specific products by name or keywords.

   * Explore filtering options (e.g., by price range, brand, rating) to narrow down your choices.

* **View Product Details:**

   * Click on any product image or title from a listing page to navigate to its dedicated product details page.

   * Here, you'll find comprehensive information: full description, clear images (potentially with a carousel/gallery), current pricing, available stock, and existing customer reviews.

* **Experience Recommendations:**

   * On the product details page, observe the "Recommended for you" or "Customers also viewed" section. This area is dynamically powered by the Python AI Recommendation Service.

   * It will display a curated list of products deemed similar or relevant to the one you are currently viewing, enhancing your discovery and potentially leading to more purchases.

* **Manage Cart:**

   * Effortlessly add desired products to your shopping cart with a single click from product listings or detail pages.

   * Navigate to your "Shopping Cart" page to review selected items, easily adjust quantities, or remove products you no longer wish to purchase.

   * The cart will dynamically update to reflect total costs.

* **Proceed to Checkout:**

   * From the shopping cart, click "Proceed to Checkout." This will guide you through the (simulated or integrated) payment process.

   * You may be prompted for shipping address details before confirming your order.

   * Experience the secure payment gateway integration for final transaction processing.

* **Leave Reviews:**

   * After purchasing a product, or even if you've just experienced one, contribute to the community by navigating back to the product's detail page.

   * You can write detailed reviews, share your experience, and leave star ratings, helping other potential customers make informed decisions.

### Admin Role

If you have access to an administrator account, you can manage the store's operations:

* **Admin Login:**

   * Log in using an account that has been specifically designated as an 'admin' in your MongoDB database. The frontend UI may provide an "Admin Login" link, or you might log in via the standard login page and then be redirected or gain access to admin features.

* **Access Admin Panel/Dashboard:**

   * Upon successful admin login, you will typically find a link or be automatically redirected to the secure admin-specific section of the application (e.g., /admin, /dashboard). This area is protected by JWT-based role-based access control.

* **Product Management:**

   * **Add Products:** Use the intuitive admin interface to effortlessly add new products to your store. This includes providing essential details like product name, a comprehensive description, price, product category, stock quantity, and uploading multiple images via Cloudinary integration.

   * **Edit Products:** Modify the details of existing products with ease. This allows you to update stock levels, change pricing, revise descriptions, add/remove images, or adjust categories to keep your catalog up-to-date.

   * **Delete Products:** Permanently remove products from the catalog that are no longer available or relevant.


* **Order Management:**

   * Track and process customer orders from placement to fulfillment.

   * View order details, update order statuses (e.g., "Processing," "Shipped," "Delivered"), and access customer shipping information.
## API Endpoints
Below are the main API endpoints exposed by your backend services. All requests typically expect and return JSON-formatted data.

### Node.js Backend (Core API)
  **Base URL:** `http://localhost:5000` (for local development)

#### Authentication
These endpoints handle user registration and login, providing secure access to the application.

* `POST /api/auth/signup`

   * Description: Registers a new user account. Users are typically registered as customer by default. An admin role might be set during initial seeding or through a separate admin user creation process.

   * **Request Body Example:**
     
```bash
JSON
```
```bash


{
  "userName": "JohnDoe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123",
  "role": "customer"
}
```
   * **Success Response (201 Created):**

```bash
JSON
```
```bash
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "65f...",
    "userName": "JohnDoe",
    "email": "john.doe@example.com",
    "role": "customer",
    "createdAt": "2023-01-01T12:00:00.000Z"
  }
}
```
   * **Error Responses (Example):**

     * `400 Bad Request`: If required fields are missing or email format is invalid.

     * `409 Conflict`: If an email already exists.

 * `POST /api/auth/login`

   * Description: Authenticates a user with their credentials. On successful login, a JSON Web Token (JWT) is returned, which must be included in subsequent authorized requests.

   * **Request Body Example:**
```bash
JSON
```
```bash
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123"
}
```

   * **Success Response (200 OK):**

```bash
JSON
```
```bash
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWY...",
    "user": {
      "_id": "65f...",
      "userName": "JohnDoe",
      "email": "john.doe@example.com",
      "role": "customer"
    }
  }
}
```

   * **Error Responses (Example):**

     * 401 Unauthorized: If email or password is incorrect.

#### Product Management (Requires Admin Authentication)
These endpoints allow administrators to manage the product catalog. All requests to these endpoints must include a valid admin JWT in the `Authorization` header (`Authorization: Bearer <ADMIN_JWT_TOKEN>`).

 * `POST /api/admin/products`

   * **Description:** Adds a new product to the database. Includes fields for product details and an image URL (typically from Cloudinary after upload).

   * **Authorization:** Requires `Authorization: Bearer <ADMIN_JWT_TOKEN>`.

   * **Request Body Example:**

```bash
JSON
```
```bash
{
  "name": "Stylish Leather Wallet",
  "description": "A high-quality leather wallet with multiple card slots.",
  "price": 49.99,
  "category": "Accessories",
  "stock": 150,
  "imageUrl": "[https://res.cloudinary.com/yourcloud/image/upload/v12345/wallet.jpg](https://res.cloudinary.com/yourcloud/image/upload/v12345/wallet.jpg)"
}
```

   * **Success Response (201 Created):**
```bash
JSON
```
```bash
{
  "success": true,
  "message": "Product added successfully",
  "product": {
    "_id": "66a...",
    "name": "Stylish Leather Wallet",
    "price": 49.99,
    "category": "Accessories",
    "stock": 150,
    "imageUrl": "...",
    "createdAt": "2024-07-30T10:00:00.000Z"
  }
}
```

   * **Error Responses (Example):**

     * `401 Unauthorized`: If no token or invalid token is provided.

     * `403 Forbidden`: If the authenticated user is not an admin.

     * `400 Bad Request`: If required product fields are missing.

 * `PUT /api/admin/products/:id`

   * **Description:** Updates an existing product identified by its ID. Supports partial updates, meaning you only need to send the fields you wish to change.

   * **Authorization:** Requires `Authorization: Bearer <ADMIN_JWT_TOKEN>`.

   * **Path Params:** `:id` - The unique MongoDB _id of the product to update.

   * **Request Body Example (Partial Update):**

```bash
JSON
```
 ```bash
{
  "price": 55.00,
  "stock": 120
}
```

   * **Success Response (200 OK):**

```bash
JSON
```
```bash
{
  "success": true,
  "message": "Product updated successfully",
  "product": {
    "_id": "66a...",
    "name": "Stylish Leather Wallet",
    "price": 55.00,
    "category": "Accessories",
    "stock": 120,
    "imageUrl": "...",
    "updatedAt": "2024-07-30T10:30:00.000Z"
  }
}
```

   * **Error Responses (Example):**

     * `401 Unauthorized`, `403 Forbidden`.

     * `404 Not Found`: If no product with the given ID exists.

     * `400 Bad Request`: If invalid data types are sent.

 * DELETE /api/admin/products/:id

   * **Description:** Deletes a product from the database using its ID. This action is irreversible.

   * **Authorization:** Requires `Authorization: Bearer <ADMIN_JWT_TOKEN>`.

   * **Path Params:** `:id` - The unique MongoDB `_id` of the product to delete.

   * **Success Response (200 OK):**
```bash
JSON
```
```bash
{
  "success": true,
  "message": "Product deleted successfully"
}
```

   * **Error Responses (Example):**

     * `401 Unauthorized`, `403 Forbidden`.

     * `404 Not Found`: If no product with the given ID exists.

#### Customer-Facing Product Endpoints
These endpoints are for general product Browse and retrieval, accessible to all users (authenticated or not).

 * `GET /api/shop/products`

   * **Description:** Retrieves a list of all available products. This endpoint can typically support query parameters for filtering, sorting, and pagination.

   * **Query Parameters (Common Examples):**

     * `category=Electronics`: Filter by category.

     * `search=laptop`: Search by product name or description.

     * `minPrice=100&maxPrice=500`: Filter by price range.

     * `sortBy=price&order=asc`: Sort products.

     * `page=1&limit=10`: Pagination.

   * **Response (200 OK):**
```bash
JSON
```
```bash
{
  "success": true,
  "data": [
    {
      "_id": "66a...",
      "name": "Stylish Leather Wallet",
      "description": "...",
      "price": 49.99,
      "category": "Accessories",
      "stock": 150,
      "imageUrl": "..."
    },
    {
      "_id": "66b...",
      "name": "Wireless Bluetooth Earbuds",
      "description": "...",
      "price": 79.99,
      "category": "Electronics",
      "stock": 200,
      "imageUrl": "..."
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalProducts": 50,
    "limit": 10
  }
}
```

   * **Error Responses (Example):**

     * `500 Internal Server Error`: If there's a database connection issue or server error.

 * `GET /api/shop/products/:id`

   * **Description:** Retrieves detailed information for a single product by its unique ID.

   * **Path Params:** `:id` - The ID of the product to retrieve.

   * **Response (200 OK):**

```bash
JSON
```

```bash
{

  "success": true,
  "data": {
    "_id": "66a...",
    "name": "Stylish Leather Wallet",
    "description": "A high-quality leather wallet with multiple card slots, perfect for daily use.",
    "price": 49.99,
    "category": "Accessories",
    "stock": 150,
    "imageUrl": "[https://res.cloudinary.com/yourcloud/image/upload/v12345/wallet.jpg](https://res.cloudinary.com/yourcloud/image/upload/v12345/wallet.jpg)",
    "ratings": 4.5,
    "numReviews": 12,
    "createdAt": "2024-07-30T10:00:00.000Z",
    "updatedAt": "2024-07-30T10:30:00.000Z"
  }
}
```

   * **Error Responses (Example):**

     * `404 Not Found`: If no product with the given ID exists.

#### Shopping Cart
These endpoints allow authenticated users to manage their shopping carts.

 * `POST /api/cart/add`

   * **Description:** Adds a specified quantity of a product to the authenticated user's cart. If the item already exists in the cart, its quantity is updated.

   * **Authorization:** Requires Authorization: Bearer <USER_JWT_TOKEN>.

   * **Request Body Example:**

```bash
JSON
```

```bash
{
  "productId": "66b...",
  "quantity": 2
}
```
  * **Success Response (200 OK):**

```bash
JSON
```

```bash
{
  "success": true,
  "message": "Product added to cart",
  "cart": {
    "_id": "66c...",
    "userId": "65f...",
    "items": [
      {
        "productId": "66a...",
        "quantity": 1,
        "price": 49.99,
        "name": "Stylish Leather Wallet"
      },
      {
        "productId": "66b...",
        "quantity": 2,
        "price": 79.99,
        "name": "Wireless Bluetooth Earbuds"
      }
    ],
    "totalPrice": 209.97,
    "updatedAt": "2024-07-30T11:00:00.000Z"
  }
}
```

  * **Error Responses (Example):**

     * `401 Unauthorized`: If no token or invalid token.

     * `400 Bad Request`: If productId or quantity is invalid.

     * `404 Not Found`: If the specified product does not exist.

 * `GET /api/cart/:userId`

   * **Description:** Retrieves the complete shopping cart contents for a specific user. The userId in the path should match the authenticated user's ID. An admin might use this to view any user's cart.

   * **Authorization:** Requires `Authorization: Bearer <USER_JWT_TOKEN>` (for the user whose cart is being retrieved) or an `ADMIN_JWT_TOKEN`.

   * **Path Params:** `:userId` - The ID of the user whose cart to retrieve.

  * **Response (200 OK):**

```bash
JSON
```

```bash
{
  "success": true,
  "data": {
    "_id": "66c...",
    "userId": "65f...",
    "items": [
      {
        "productId": "66a...",
        "quantity": 1,
        "price": 49.99,
        "name": "Stylish Leather Wallet"
      },
      {
        "productId": "66b...",
        "quantity": 2,
        "price": 79.99,
        "name": "Wireless Bluetooth Earbuds"
      }
    ],
    "totalPrice": 209.97,
    "createdAt": "2024-07-30T09:00:00.000Z",
    "updatedAt": "2024-07-30T11:00:00.000Z"
  }
}```

  * **Error Responses (Example):**

     * `401 Unauthorized`: If token is missing or invalid.

     * `403 Forbidden`: If userId does not match authenticated user ID and the user is not an admin.

     * `404 Not Found`: If no cart exists for the given user ID.

 * `PUT /api/cart/update`**(Suggested Addition)**

   * **Description:** Updates the quantity of a specific item in the authenticated user's cart.

   **Authorization:** Requires `Authorization: Bearer <USER_JWT_TOKEN>`.

  * **Request Body Example:**

```bash
JSON
```
```bash
{
  "productId": "66b...",
  "quantity": 3
}
```

  * **Success Response (200 OK):** (Similar to POST /api/cart/add success response)

  * **Error Responses (Example):**

     `401 Unauthorized`, `400 Bad Request`, `404 Not Found`.

 * `DELETE /api/cart/remove/:productId`**(Suggested Addition)**

   * **Description:** Removes a specific product entirely from the authenticated user's cart.

   * **Authorization:** Requires Authorization: Bearer <USER_JWT_TOKEN>.

   * **Path Params:** `:productId` - The ID of the product to remove from the cart.

  * **Success Response (200 OK):**

```bash
JSON
```
```bash
{
  "success": true,
  "message": "Product removed from cart",
  "cart": { /* Updated cart object */ }
}
```

  * **Error Responses (Example):**

     * `401 Unauthorized`, `404 Not Found` (if product not in cart or cart not found).

#### Reviews
These endpoints manage customer product reviews and ratings.

 * `POST /api/review/add`

   *   Description:** Allows an authenticated user to submit a review and rating for a product.

   * **Authorization:** Requires `Authorization: Bearer <USER_JWT_TOKEN>`.

  * **Request Body Example:**

```bash
JSON
```
```bash
{
  "productId": "66a...",
  "userId": "65f...",
  "userName": "JohnDoe",
  "rating": 5,
  "comment": "This wallet is fantastic! Great quality and looks very elegant."
}
```

  * **Success Response (201 Created):**
```bash
JSON
```
```bash
{
  "success": true,
  "message": "Review added successfully",
  "review": {
    "_id": "66d...",
    "productId": "66a...",
    "userId": "65f...",
    "userName": "JohnDoe",
    "rating": 5,
    "comment": "This wallet is fantastic!...",
    "createdAt": "2024-07-30T11:30:00.000Z"
  }
}
```

  * **Error Responses (Example):**

     * `401 Unauthorized`, `400 Bad Request` (e.g., missing fields, invalid rating value).

     * `404 Not Found`: If the productId does not exist.

     * `409 Conflict`: If the user has already reviewed this product (if your policy is one review per user).

 * `GET /api/review/:productId`

   * **Description:** Retrieves all reviews associated with a specific product.

   * **Path Params:** `:productId` - The ID of the product for which to retrieve reviews.

  * **Response (200 OK):**

```bash
JSON
```
```bash

{
  "success": true,
  "data": [
    {
      "_id": "66d...",
      "productId": "66a...",
      "userId": "65f...",
      "userName": "JohnDoe",
      "rating": 5,
      "comment": "This wallet is fantastic!...",
      "createdAt": "2024-07-30T11:30:00.000Z"
    },
    {
      "_id": "66e...",
      "productId": "66a...",
      "userId": "65g...",
      "userName": "JaneSmith",
      "rating": 4,
      "comment": "Good quality, but a bit smaller than expected.",
      "createdAt": "2024-07-30T12:00:00.000Z"
    }
  ]
}```

  * **Error Responses (Example):**

     * `404 Not Found`: If no product with the given ID exists.

     * `200 OK with data`: []: If the product exists but has no reviews.

#### Python Backend (AI Recommendation Service)
**Base URL:** `http://localhost:5001` (for local development)

These endpoints are dedicated to generating and retrieving product recommendations.

 * `GET /recommendations/:product_id`

   * **Description:** Returns a list of up to 5 recommended product objects based on the features (like description, category) of the given product_id. The AI service fetches product data directly from MongoDB to ensure recommendations are based on the latest catalog.

   * **Path Params:** `:product_id` - The ID of the product for which to generate recommendations.

  * **Success Response (200 OK):**

```bash
JSON
```

```bash
[
  {
    "_id": "66f...",
    "name": "Classic Leather Belt",
    "price": 29.99,
    "category": "Accessories",
    "imageUrl": "[https://res.cloudinary.com/yourcloud/image/upload/v12345/belt.jpg](https://res.cloudinary.com/yourcloud/image/upload/v12345/belt.jpg)",
    "description": "A durable and stylish leather belt..."
  },
  {
    "_id": "67a...",
    "name": "Premium Sunglasses",
    "price": 89.99,
    "category": "Accessories",
    "imageUrl": "[https://res.cloudinary.com/yourcloud/image/upload/v12345/sunglasses.jpg](https://res.cloudinary.com/yourcloud/image/upload/v12345/sunglasses.jpg)",
    "description": "High-quality polarized sunglasses..."
  },
  {
    "_id": "67b...",
    "name": "Luxury Watch",
    "price": 299.99,
    "category": "Accessories",
    "imageUrl": "[https://res.cloudinary.com/yourcloud/image/upload/v12345/watch.jpg](https://res.cloudinary.com/yourcloud/image/upload/v12345/watch.jpg)",
    "description": "An elegant timepiece for any occasion..."
  }
]
```
  * **Notes:**

     * The returned product objects might contain a subset of fields compared to the full product details from the Node.js backend (/api/shop/products/:id). The Frontend typically fetches full details using these IDs from the Node.js backend.

     * The number of recommendations might vary based on data availability and algorithm.

  * **Error Responses (Example):**

     * `404 Not Found`: If the product_id does not exist in the database (and thus cannot be used for recommendations).

     * `500 Internal Server Error:` If there's an issue with the AI model or database connection.

 * `GET /health`

   * **Description:** Provides a simple health check status of the recommendation service. It verifies if the Flask application is running and if it can successfully connect to the MongoDB database.

  * **Success Response (200 OK):**

```bash
JSON
```
```bash
{
  "status": "healthy",
  "db_connected": true
}
```
  * **Error Response (500 Internal Server Error):**

```bash
JSON
```
```bash
{
  "status": "unhealthy",
  "db_connected": false,
  "error": "Failed to connect to MongoDB: Authentication failed."
}
```
## Deployment

The PickNPay application is architected for seamless deployment on cloud platforms, leveraging services that support continuous integration and delivery.

* **Frontend (React App) - Deployed on Netlify:**

   * **Build & Deploy:** Your client directory is built and served by Netlify. Netlify automatically detects your Vite project.

   * **Environment Variables:** Crucially, for your deployed frontend to communicate with your live backend services, you must set the following environment variables in your Netlify site settings (Go to Site settings > Build & deploy > Environment variables):

     * `VITE_BACKEND_URL`: Set this to the public URL of your deployed Node.js backend on Render (e.g., `https://your-node-backend-name.onrender.com1`).

     * `VITE_PYTHON_RECOMMENDER_PROD_URL`: Set this to the public URL of your deployed Python AI service on Render (e.g., `https://picknpay-9evw.onrender.com`).

   * Ensure your Netlify build command is typically npm run build or vite build.

* **Backend Services (Node.js & Python) - Deployed on Render:**

   * `.render.yaml Configuration`: The services defined in the .render.yaml file at the root of your repository dictate how Render builds and runs your two backend services. This file specifies:

     * The type of service (`web`).

     * The name of the service (`picknpay-reccomendation-System`, `picknpay-backend`).

     * The programming environment (`python`, `node`).

     * The rootDir for each service (e.g., `picknpay-ai-service`, `server`).

     * The buildCommand (e.g., `pip install -r requirements.txt`, `npm install`).

     * The startCommand (e.g., `python app.py`, `node server.js` or `npm start`).

   * **Environment Variables on Render:** For both your Node.js and Python services on Render, you must configure their respective environment variables (e.g., `MONGO_DB_URL`, `JWT_SECRET`, `EMAIL_USER`, etc.) directly within the Render dashboard for each service's settings. These are different from the ones set in your `.env` files locally and different from Netlify's.

   * **Public URLs:** Each deployed service on Render will be assigned a unique public URL (e.g., `https://picknpay-0xyz.onrender.com`). Use these URLs in your frontend's Netlify environment variables.
## Future Enhancement

Here are some key areas for future enhancements to elevate your e-commerce platform:

   * **Advanced Product Recommendations:** Move beyond basic content-based suggestions to incorporate collaborative filtering and hybrid models. This means recommending products not just based on what they are, but also on what similar users have liked or purchased, making recommendations much more personalized and effective.

   * **Comprehensive Order Management:** Implement a full-fledged admin order dashboard for managing order statuses, tracking shipments, and handling returns. For customers, provide a detailed order history with real-time status updates and delivery tracking.

   * **User Personalization & Experience:** Enhance the user journey with personalized homepages, a wishlist feature for saving favorite items, and displaying recently viewed products. This makes shopping more intuitive and tailored to individual preferences.

   * **Robust Inventory System:** Introduce stock alerts to notify administrators when product levels are low, and enable batch updates for quick modifications to multiple products. Consider supporting product variants (e.g., different sizes, colors) with individual stock tracking.

   * **Automated Email Notifications:** Implement automated email workflows for critical events like order confirmations, shipping updates, and password resets. This keeps users informed and improves communication.

   * **Email Verification & Recovery:** For enhanced security and user convenience, implement a "Forgot Email" recovery process. This would allow users who have forgotten their registered email address to recover it through alternative verification methods, ensuring they can regain access to their accounts.

And you can many Enhacements as you see it through
## Contributing

We welcome and appreciate contributions to the PickNPay project! Whether it's bug fixes, new features, or documentation improvements, your help is valuable. Please follow these guidelines:

   **1. Fork the repository:** Start by forking the `therealabhiraj/PickNPay` repository on GitHub.

**2. Clone your forked repository:** Get a local copy of your fork on your machine.
`git clone https://github.com/YOUR_USERNAME/PickNPay.git`

**3. Create a new branch:** For each new feature or bug fix, create a dedicated branch. This keeps changes isolated.
`git checkout -b feature/your-awesome-feature` (for new features)
`git checkout -b bugfix/resolve-issue-xyz` (for bug fixes)

**4. Make your changes:** Implement your feature or fix the bug. Ensure your code adheres to the existing coding style and conventions.

**5. Test your changes:** Thoroughly test your modifications to ensure they work as expected and don't introduce new issues.

**6. Write clear commit messages:** Follow a conventional commit style (e.g., `feat: Add user profile management`, `fix: Correct cart quantity bug`,` docs: Update README installation`).
`git commit -m "feat: Add new user profile page"`

**7. Push your changes:** Push your local branch to your forked repository on GitHub.
`git push origin feature/your-awesome-feature`

**8. Open a Pull Request (PR):** Go to the original `therealabhiraj/PickNPay` repository on GitHub and open a new Pull Request from your feature branch.

**9. Provide a detailed description:** In your PR description, explain what changes you've made, why you've made them, and how they can be tested. Include screenshots or GIFs if appropriate.


## License

This project is open-source and licensed under the **MIT License**.

You can find the full text of the license in the `LICENSE` file at the root of this repository. This means you are free to use, modify, and distribute this software, provided you include the original copyright and license notice.
## Contacts



For any questions, feedback, inquiries, or collaboration opportunities, please feel free to reach out to the project maintainer:

   * **Abhishek kumar choudhary**

     * **Email:** abhi17082003@gmail.com

     * **GitHub Profile:** [therealabhiraj](https://github.com/therealabhiraj)

