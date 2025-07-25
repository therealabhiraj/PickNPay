const mongoose = require("mongoose");

const FeatureImageSchema = new mongoose.Schema({
    image: {
        type: String, 
        required: true,
    },
    title: {
        type: String,
        default: '',
    },
    link: {
        type: String, 
        default: '',
    },
    order: {
        type: Number, 
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const FeatureImage = mongoose.model("FeatureImage", FeatureImageSchema);
module.exports = FeatureImage;