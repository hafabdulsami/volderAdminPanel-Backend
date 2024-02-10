const multer = require('multer');
const path = require('path');

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination folder where uploaded images will be stored
    cb(null, './Images');
  },
  filename: function (req, file, cb) {
    // Rename the uploaded file (you can customize the filename as needed)
    cb(null, file.originalname);
  },
});

// Create Multer instance with specified storage options
const upload = multer({ storage: storage });
module.exports = { upload };