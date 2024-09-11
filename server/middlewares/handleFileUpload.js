const { upload } = require("./uploadMiddleware");

function handleFileUpload(req, res, next) {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ msg: "It's not you, it's me." });
    }

    if (req.file) {
      console.log(req.file.filename);
      req.body.imageUrl = `/uploads/${req.file.filename}`;
    } else {
      console.log("No file uploaded");
      req.body.imageUrl = null;
    }
    next();
  });
}

module.exports = handleFileUpload;
