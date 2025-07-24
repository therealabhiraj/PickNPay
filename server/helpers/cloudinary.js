const cloudinary = require("cloudinary").v2;
const multer = require("multer"); // You might need to add require('dotenv').config(); at the very top of your main server file (e.g., server.js or index.js) if you haven't already.

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Use your actual env var name
  api_key: process.env.CLOUDINARY_API_KEY,       // Use your actual env var name
  api_secret: process.env.CLOUDINARY_API_SECRET, // Use your actual env var name
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };