// const Feature = require("../../models/Feature");

// const addFeatureImage = async (req, res) => {
//   try {
//     const { image } = req.body;

//     console.log(image, "image");

//     const featureImages = new Feature({
//       image,
//     });

//     await featureImages.save();

//     res.status(201).json({
//       success: true,
//       data: featureImages,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occured!",
//     });
//   }
// };

// const getFeatureImages = async (req, res) => {
//   try {
//     const images = await Feature.find({});

//     res.status(200).json({
//       success: true,
//       data: images,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occured!",
//     });
//   }
// };

// module.exports = { addFeatureImage, getFeatureImages };


const Feature = require("../../models/Feature");

const addFeatureImage = async (req, res) => {
  try {
    const {
      image: imageDataFromFrontend,
      title: featureTitle,
      link: featureLink,
      order: featureOrder
    } = req.body;

    const cloudinaryImageUrl = imageDataFromFrontend.image;

    console.log("Extracted Cloudinary URL:", cloudinaryImageUrl);
    console.log("Extracted Title:", featureTitle);
    console.log("Extracted Link:", featureLink);
    console.log("Extracted Order:", featureOrder);

    if (!cloudinaryImageUrl) {
      return res.status(400).json({
        success: false,
        message: "Image URL is missing in the request payload.",
      });
    }

    const newFeatureImage = new Feature({
      image: cloudinaryImageUrl,
      title: featureTitle,
      link: featureLink,
      order: Number(featureOrder),
    });

    await newFeatureImage.save();

    res.status(201).json({
      success: true,
      message: "Feature image added successfully!",
      data: newFeatureImage,
    });
  } catch (e) {
    console.error("Error adding feature image:", e);
    res.status(500).json({
      success: false,
      message: "Failed to add feature image. Please check server logs for details.",
      error: e.message
    });
  }
};

const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.error("Error getting feature images:", e);
    res.status(500).json({
      success: false,
      message: "Some error occured while fetching images!",
      error: e.message
    });
  }
};

// --- ADD THIS deleteFeatureImage FUNCTION ---
const deleteFeatureImage = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the URL parameters

    // Check if ID is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Image ID is required for deletion.",
      });
    }

    // Find the image by ID and delete it
    const deletedImage = await Feature.findByIdAndDelete(id);

    if (!deletedImage) {
      return res.status(404).json({
        success: false,
        message: "Feature image not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feature image deleted successfully!",
      data: deletedImage, // Optionally return the deleted image data
    });

  } catch (e) {
    console.error("Error deleting feature image:", e);
    res.status(500).json({
      success: false,
      message: "Failed to delete feature image. Please check server logs for details.",
      error: e.message
    });
  }
};
// --- END OF deleteFeatureImage FUNCTION ---


// --- Update module.exports to include deleteFeatureImage ---
module.exports = {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage, // <--- Add this line!
};