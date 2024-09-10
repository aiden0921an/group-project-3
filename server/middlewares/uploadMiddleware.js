const multer = require("multer");
const path = require("path");

// Configure Multer storage
const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads"); // Ensure the "uploads" directory exists
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Configure Multer middleware with file size limits and file type validation
const upload = multer({
  storage: imgconfig,
  limits: { fileSize: 100000000 }, // 1MB file size limit
  fileFilter: (req, file, callback) => {
    const fileType = /jpeg|jpg|png|gif/;
    const mimeType = fileType.test(file.mimetype);
    const extname = fileType.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimeType && extname) {
      return callback(null, true);
    }
    callback("Error: Invalid file type");
  },
}).single("image");

module.exports = { upload };
