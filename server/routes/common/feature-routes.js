const express = require("express");

const {
  getFeatureImages,
  addFeatureImage,
  deleteFeatureImage,
} = require("../../controllers/common/feature-controller"); 
const router = express.Router();


router.route("/get").get(getFeatureImages); 
router.route("/add").post(addFeatureImage);
router.route("/delete/:id").delete(deleteFeatureImage); 

module.exports = router;