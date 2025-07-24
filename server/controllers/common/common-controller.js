// const FeatureImage = require("../../models/FeatureImage"); // This path should now be correct

// // Controller to get all feature images
// const getFeatureImages = async (req, res) => {
//     try {
//         const images = await FeatureImage.find().sort({ order: 1 }); // Fetch all, sorted by order
//         res.status(200).json({
//             success: true,
//             message: "Feature images fetched successfully!",
//             data: images,
//         });
//     } catch (error) {
//         console.error("Error fetching feature images:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch feature images.",
//             error: error.message,
//         });
//     }
// };

// // Controller to add a new feature image
// const addFeatureImage = async (req, res) => {
//     // Destructure req.body. The 'image' property from req.body is actually an object.
//     // So, we rename it to 'imageDataFromFrontend' (or anything descriptive)
//     // and then extract 'title', 'link', 'order' directly from req.body.
//     const { image: imageDataFromFrontend, title, link, order } = req.body;

//     // Now, get the actual image URL string from inside the imageDataFromFrontend object
//     const imageURL = imageDataFromFrontend.image;

//     if (!imageURL) {
//         return res.status(400).json({
//             success: false,
//             message: "Image URL is required to add a feature image.",
//         });
//     }

//     try {
//         const newFeatureImage = new FeatureImage({
//             image: imageURL, // Use the extracted URL string here
//             title,
//             link,
//             order,
//         });
//         await newFeatureImage.save();
//         res.status(201).json({
//             success: true,
//             message: "Feature image added successfully!",
//             data: newFeatureImage,
//         });
//     } catch (error) {
//         console.error("Error adding feature image:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to add feature image.",
//             error: error.message,
//         });
//     }
// };

// module.exports = {
//     getFeatureImages, // Make sure this is present and uncommented
//     addFeatureImage,  // Make sure this is present and uncommented
// };

const FeatureImage = require("../../models/FeatureImage");
const cloudinary = require("cloudinary").v2; // Make sure cloudinary is imported

// Configure Cloudinary (ensure this is done somewhere, e.g., in server.js or a config file)
// If you already have it configured globally, you might not need it here,
// but it's good to ensure it's accessible where you use it.
// Example:
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });


// Controller to get all feature images
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

// Controller to add a new feature image
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

// --- NEW FUNCTION: Controller to delete a feature image ---
const deleteFeatureImage = async (req, res) => {
    const { id } = req.params; // Get the image ID from the URL parameter

    try {
        // Find the image in the database
        const imageToDelete = await FeatureImage.findById(id);

        if (!imageToDelete) {
            return res.status(404).json({
                success: false,
                message: "Feature image not found.",
            });
        }

        // Extract the public ID from the Cloudinary URL
        // Example URL: https://res.cloudinary.com/yourcloudname/image/upload/v123456789/public_id_of_image.png
        const publicId = imageToDelete.image.split('/').pop().split('.')[0];
        // console.log("Extracted Public ID for Cloudinary deletion:", publicId); // For debugging

        // Delete the image from Cloudinary
        await cloudinary.uploader.destroy(publicId);
        // console.log("Image deleted from Cloudinary successfully."); // For debugging

        // Delete the image record from MongoDB
        await FeatureImage.findByIdAndDelete(id);
        // console.log("Image record deleted from MongoDB successfully."); // For debugging

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
// --- END NEW FUNCTION ---

module.exports = {
    getFeatureImages,
    addFeatureImage,
    deleteFeatureImage, // Export the new function
};