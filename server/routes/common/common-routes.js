// const express = require("express");
// const {
//     getFeatureImages,
//     addFeatureImage,
// } = require("../../controllers/common/common-controller"); // This is the line to fix!

// const router = express.Router();

// router.get("/common/feature/get", getFeatureImages);
// router.post("/common/feature/add", addFeatureImage);

// module.exports = router;

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