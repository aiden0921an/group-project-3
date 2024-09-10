const { upload } = require("./uploadMiddleware");

function handleFileUpload(req, res, next) {
  upload(req, res, (err) => {
    console.log(req.file.filename);
    req.body.imageUrl = `/uploads/${req.file.filename}`;
    if (!err) {
      next();
    } else {
      res.status(500).json({ msg: "It's not you, it's me." });
    }
  });
}

module.exports = handleFileUpload;
