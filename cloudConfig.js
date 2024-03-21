const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_SECRET
})



const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Holstellers',
      allowed_formats: ["png", "jpg", "jpeg"],
      max_file_size: 4 * 1024 * 1024 // 4 MB
    },
  });
const upload = multer({ storage: storage });

module.exports = {
    cloudinary,
    upload
}