import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addFeatureImage,
  deleteFeatureImage,
  getFeatureImages,
} from "@/store/common-slice";
import { useToast } from "@/components/ui/use-toast";
import { Trash2Icon } from "lucide-react";
import axios from "axios";

function ManageFeatureImages() {
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [order, setOrder] = useState(0);
  const { featureImageList, isLoading } = useSelector(
    (state) => state.commonFeature
  );

  const dispatch = useDispatch();
  const { toast } = useToast();
 

  const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || "First_Name_Using_Cloudinary";
  const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "dni1ntukq";
    
 

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  function handleFileChange(event) {
    setImageFile(event.target.files[0]); 
  }

  async function handleAddFeatureImage() {
    if (!imageFile) {
      toast({
        title: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

  
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", CLOUDINARY_CLOUD_NAME);

    let actualCloudinaryUrl = "";
    try {
      
      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        data
      );
      actualCloudinaryUrl = cloudinaryResponse.data.secure_url;
      toast({
        title: "Image uploaded to Cloudinary successfully!",
        variant: "success",
      });
    } catch (cloudinaryError) {
      console.error("Cloudinary upload error:", cloudinaryError);
      toast({
        title: "Failed to upload image to Cloudinary.",
        description: cloudinaryError.response?.data?.message || cloudinaryError.message,
        variant: "destructive",
      });
      return; 
    }

   
    const payloadForBackend = {
      image: {
        image: actualCloudinaryUrl,
       
        title: title,
        link: link,
        order: Number(order),
      },
      
      title: title,
      link: link,
      order: Number(order),
    };

    try {
      const resultAction = await dispatch(addFeatureImage(payloadForBackend));

      if (addFeatureImage.fulfilled.match(resultAction)) {
        toast({
          title: "Feature image added successfully!",
        });
        
        setImageFile(null);
        setTitle("");
        setLink("");
        setOrder(0);
       
        document.getElementById("imageFile").value = "";
      } else {
        toast({
          title: "Failed to add feature image.",
          description: resultAction.payload || "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding feature image to backend:", error);
      toast({
        title: "An unexpected error occurred.",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  async function handleDeleteFeatureImage(imageId) {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        const resultAction = await dispatch(deleteFeatureImage(imageId));
        if (deleteFeatureImage.fulfilled.match(resultAction)) {
          toast({
            title: "Feature image deleted successfully!",
          });
        } else {
          toast({
            title: "Failed to delete feature image.",
            description: resultAction.payload || "An unexpected error occurred.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error deleting feature image:", error);
        toast({
          title: "An unexpected error occurred during deletion.",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Feature Images</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Feature Image</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="imageFile">Image File</Label>
              <Input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter image title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="link">Link</Label>
              <Input
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter link URL (optional)"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="order">Order</Label>
              <Input
                id="order"
                type="number"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                placeholder="Enter display order"
              />
            </div>
            <Button onClick={handleAddFeatureImage} disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Image"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold mb-4">Existing Feature Images</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureImageList && featureImageList.length > 0 ? (
          featureImageList.map((image) => (
            <Card key={image._id} className="relative">
              <CardContent className="p-4">
                <img
                  src={image.image} 
                  alt={image.title || "Feature Image"}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h3 className="font-semibold text-lg">{image.title}</h3>
                <p className="text-sm text-gray-600">Link: {image.link}</p>
                <p className="text-sm text-gray-600">Order: {image.order}</p>
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => handleDeleteFeatureImage(image._id)}
                  disabled={isLoading}
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No feature images found.</p>
        )}
      </div>
    </div>
  );
}

export default ManageFeatureImages;

// to upload the image visit here :- http://localhost:5173/admin/manage-homepage-images 