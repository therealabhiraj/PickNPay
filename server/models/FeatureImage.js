const mongoose = require("mongoose");

const FeatureImageSchema = new mongoose.Schema({
    image: {
        type: String, // To store the Cloudinary URL of the image
        required: true,
    },
    title: {
        type: String, // Optional: for a title on the banner
        default: '',
    },
    link: {
        type: String, // Optional: URL to redirect when banner is clicked
        default: '',
    },
    order: {
        type: Number, // Optional: for controlling display order
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const FeatureImage = mongoose.model("FeatureImage", FeatureImageSchema);
module.exports = FeatureImage;