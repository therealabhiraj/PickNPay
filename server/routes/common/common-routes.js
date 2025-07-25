const express = require("express");
const {
    getFeatureImages,
    addFeatureImage,
    deleteFeatureImage,
} = require("../../controllers/common/feature-controller"); 
const router = express.Router();

router.route("/feature/get").get(getFeatureImages);
router.route("/feature/add").post(addFeatureImage);
router.route("/feature/delete/:id").delete(deleteFeatureImage);

module.exports = router;