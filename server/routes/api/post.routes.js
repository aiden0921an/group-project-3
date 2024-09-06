const router = require("express").Router();
const upload = require("../../middlewares/uploadMiddleware");

// Import any controllers needed here
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePostById,
  deletePostById,
  createPostWithImage,
} = require("../../controllers/post.controller");

router.post("/", upload.single("image"), createPostWithImage);

// Declare the routes that point to the controllers above
router.get("/post", async (req, res) => {
  try {
    const payload = await getAllPosts();
    res.status(200).json({ result: "success", payload });
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message });
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const payload = await getPostById(req.params.id);
    res.status(200).json({ result: "success", payload });
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message });
  }
});

router.post("/post", async (req, res) => {
  try {
    const payload = await createPost(req.body);
    res.status(200).json({ result: "success", payload });
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message });
  }
});

router.put("/post/:id", async (req, res) => {
  try {
    const payload = await updatePostById(req.params.id, req.body);
    res.status(200).json({ result: "success", payload });
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message });
  }
});

router.delete("/post/:id", async (req, res) => {
  try {
    const payload = await deletePostById(req.params.id);
    res.status(200).json({ result: "success", payload });
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message });
  }
});

module.exports = router;
