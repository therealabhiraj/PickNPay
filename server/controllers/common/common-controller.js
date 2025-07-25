const FeatureImage = require("../../models/FeatureImage");
const cloudinary = require("cloudinary").v2; 





const getFeatureImages = async (req, res) => {
    try {
        const images = await FeatureImage.find().sort({ order: 1 });
        res.status(200).json({
            success: true,
            message: "Feature images fetched successfully!",
            data: images,
        });
    } catch (error) {
        console.error("Error fetching feature images:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch feature images.",
            error: error.message,
        });
    }
};


const addFeatureImage = async (req, res) => {
    const { image: imageDataFromFrontend, title, link, order } = req.body;
    const imageURL = imageDataFromFrontend.image;

    if (!imageURL) {
        return res.status(400).json({
            success: false,
            message: "Image URL is required to add a feature image.",
        });
    }

    try {
        const newFeatureImage = new FeatureImage({
            image: imageURL,
            title,
            link,
            order,
        });
        await newFeatureImage.save();
        res.status(201).json({
            success: true,
            message: "Feature image added successfully!",
            data: newFeatureImage,
        });
    } catch (error) {
        console.error("Error adding feature image:", error);
        res.status(500).json({
            success: false,
            message: "Failed to add feature image.",
            error: error.message,
        });
    }
};


const deleteFeatureImage = async (req, res) => {
    const { id } = req.params; 

    try {
        
        const imageToDelete = await FeatureImage.findById(id);

        if (!imageToDelete) {
            return res.status(404).json({
                success: false,
                message: "Feature image not found.",
            });
        }

        const publicId = imageToDelete.image.split('/').pop().split('.')[0];
       
        await cloudinary.uploader.destroy(publicId);
        
        await FeatureImage.findByIdAndDelete(id);
       
        res.status(200).json({
            success: true,
            message: "Feature image deleted successfully!",
        });

    } catch (error) {
        console.error("Error deleting feature image:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete feature image.",
            error: error.message,
        });
    }
};


module.exports = {
    getFeatureImages,
    addFeatureImage,
    deleteFeatureImage, 
};