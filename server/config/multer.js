// const multer = require('multer');
// const path = require('path');


// // Đường dẫn tới thư mục public/images
// const publicImagesDir = path.join(__dirname, '..', 'public', 'images');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, publicImagesDir);  // Đảm bảo đường dẫn này là đúng
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });
// module.exports = upload;


const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Thư mục lưu trên Cloudinary
    format: async (req, file) => "png", // Định dạng file
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
