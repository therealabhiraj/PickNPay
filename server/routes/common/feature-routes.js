// const express = require("express");

// const {
//   addFeatureImage,
//   getFeatureImages,
// } = require("../../controllers/common/feature-controller");

// const router = express.Router();

// router.post("/add", addFeatureImage);
// router.get("/get", getFeatureImages);

// module.exports = router;

// const express = require("express");

// const {
//   getFeatureImages,
//   addFeatureImage,
//   deleteFeatureImage, // <--- You MUST import deleteFeatureImage here!
// } = require("../../controllers/common/feature-controller"); // <--- Confirm this path is correct for your controllers

// const router = express.Router();

// // I'm assuming these are meant to be relative to a base path like /api/common
// // If your server.js has app.use('/api/common', commonRoutes); then these paths are correct.
// router.route("/feature/get").get(getFeatureImages);
// router.route("/feature/add").post(addFeatureImage);
// router.route("/feature/delete/:id").delete(deleteFeatureImage); // <--- You MUST add this route!

// module.exports = router;

const express = require("express");

const {
  getFeatureImages,
  addFeatureImage,
  deleteFeatureImage,
} = require("../../controllers/common/feature-controller"); // Confirm this path is correct

const router = express.Router();

// Remove the '/feature' prefix from these routes
router.route("/get").get(getFeatureImages); // Changed from "/feature/get"
router.route("/add").post(addFeatureImage); // Changed from "/feature/add"
router.route("/delete/:id").delete(deleteFeatureImage); // Changed from "/feature/delete/:id"

module.exports = router;