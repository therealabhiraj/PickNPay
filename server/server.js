// require('dotenv').config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const authRouter = require("./routes/auth/auth-routes");
// const adminProductsRouter = require("./routes/admin/products-routes");
// const adminOrderRouter = require("./routes/admin/order-routes");

// const shopProductsRouter = require("./routes/shop/products-routes");
// const shopCartRouter = require("./routes/shop/cart-routes");
// const shopAddressRouter = require("./routes/shop/address-routes");
// const shopOrderRouter = require("./routes/shop/order-routes");
// const shopSearchRouter = require("./routes/shop/search-routes");
// const shopReviewRouter = require("./routes/shop/review-routes");

// const commonRoutes = require("./routes/common/common-routes"); 
// const commonFeatureRouter = require("./routes/common/feature-routes");
// const shopRecommendationRouter = require("./routes/shop/recommendation-routes"); // ADD THIS LINE




// mongoose
//   .connect(process.env.MONGO_DB_URL) 
//   .then(() => console.log("MongoDB connected"))
//   .catch((error) => console.log(error));

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(
//   cors({
//     origin: ["http://localhost:5173", "https://picknpays.netlify.app"],
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "Cache-Control",
//       "Expires",
//       "Pragma",
//     ],
//     credentials: true,
//   })
// );

// app.use(cookieParser());
// app.use(express.json());
// app.use("/api/auth", authRouter);
// app.use("/api/admin/products", adminProductsRouter);
// app.use("/api/admin/orders", adminOrderRouter);

// app.use("/api/shop/products", shopProductsRouter);
// app.use("/api/shop/cart", shopCartRouter);
// app.use("/api/shop/address", shopAddressRouter);
// app.use("/api/shop/order", shopOrderRouter);
// app.use("/api/shop/search", shopSearchRouter);
// app.use("/api/shop/review", shopReviewRouter);

// app.use("/api", commonRoutes); 
// app.use("/api/common/feature", commonFeatureRouter);
// app.use("/api/shop", shopRecommendationRouter); // ADD THIS LINE

// app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));


// C:\Users\abhi1\Downloads\PickNPay\PickNPay\server\server.js

require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");

const commonRoutes = require("./routes/common/common-routes");
const commonFeatureRouter = require("./routes/common/feature-routes");
const shopRecommendationRouter = require("./routes/shop/recommendation-routes");

// --- NEW: Import the chatbot router ---
// Make sure this path is correct based on where you created chatbot-routes.js
const chatbotRouter = require('./routes/common/chatbot-routes');
// --- END NEW ---


mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://picknpays.netlify.app"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// --- Your existing route definitions ---
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api", commonRoutes);
app.use("/api/common/feature", commonFeatureRouter);
app.use("/api/shop", shopRecommendationRouter);

// --- NEW: Mount the chatbot router ---
// This line uses the router you exported from chatbot-routes.js
// It means any routes defined in chatbot-routes.js (like '/message')
// will be accessible under '/api/chatbot/message'.
app.use("/api/chatbot", chatbotRouter);
// --- END NEW ---


app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));