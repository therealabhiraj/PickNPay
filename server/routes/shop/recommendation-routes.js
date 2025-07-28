// C:\Users\abhi1\Downloads\PickNPay\PickNPay\routes\shop\recommendation-routes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// Important: This URL points to your Python AI service.
// For local development, it's http://localhost:5001.
// For production on Render, it will be an environment variable set in your Node.js service.
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:5001';

router.get('/recommendations/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(`Node.js backend: Requesting recommendations for product ID: ${productId}`);
    console.log(`Node.js backend: Calling AI service at ${AI_SERVICE_URL}/recommendations/${productId}`);

    // Make an HTTP GET request to your Python AI service
    const response = await axios.get(`${AI_SERVICE_URL}/recommendations/${productId}`);

    // Log the response from the AI service (for debugging)
    console.log("Node.js backend: Received recommendations from AI service.");

    // Forward the response (recommended products data) from the AI service back to the frontend
    res.status(response.status).json({
      success: true,
      data: response.data // This will be the array of recommended products
    });
  } catch (error) {
    console.error("Node.js backend: Error fetching recommendations from AI service:", error.message);
    if (error.response) {
        console.error("AI Service Response Data:", error.response.data);
        console.error("AI Service Response Status:", error.response.status);
    } else if (error.request) {
        console.error("No response received from AI service:", error.request);
    } else {
        console.error("Error setting up request to AI service:", error.message);
    }
    console.error("AI service URL attempted:", AI_SERVICE_URL); // Helps in debugging

    // Return an error response to the frontend
    res.status(500).json({
      success: false,
      message: "Failed to fetch recommendations. AI service might be down or misconfigured.",
      error: error.message
    });
  }
});

module.exports = router;