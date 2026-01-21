import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import path from "path";
import dotenv from "dotenv"
dotenv.config({
    path:'./.env'
});


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
}); 


const uploadToCloudinary = async (localFilePath) => {

  console.log("CLOUDINARY ENV:", {
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET,
});

  try {
    if (!localFilePath) return null;


    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });
   

    console.log(" Uploaded to Cloudinary:", response.secure_url);
    return response;
  } catch (error) {
    console.error(" FINAL Cloudinary error:", error);
    return null;
  }
};

export { uploadToCloudinary };
