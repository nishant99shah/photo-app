// cloudinaryUtils.js

import cloudinary from "cloudinary-core";

// cloudinary.config({
//   cloud_name: "ddnieduzj",
//   api_key: "241211574719549",
//   api_secret: "8IyeYDx4FKIxYEOqUVs6_ldHhM0",
// });
const cloudinaryInstance = new cloudinary.Cloudinary({cloud_name: "ddnieduzj"});

export async function uploadImageToCloudinary(base64Image) {
  try {
    const uploadResult = await cloudinaryInstance.upload(base64Image, {
      folder: "assignment",
      format: "png",
      resource_type: "image",
    });

    return uploadResult.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
}
