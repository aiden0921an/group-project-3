const multer = require("multer");
const path = require("path");

const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: imgconfig,
  limits: { fileSize: 10000000 },
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
