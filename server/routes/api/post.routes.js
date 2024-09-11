const router = require("express").Router();
const { upload } = require("../../middlewares/uploadMiddleware");
const handleFileUpload = require("../../middlewares/handleFileUpload");

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePostById,
  deletePostById,
  getPostsByUserId,
  createPostWithImage,
} = require("../../controllers/post.controller");

async function authMiddleware(req, res, next) {
  try {
    const user = await verifyUser(req);
    if (!user) {
      return res.status(401).json({ result: "error", message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message });
  }
}

router.get("/", async (req, res) => {
  try {
    const payload = await getAllPosts();
    res.status(200).json({ result: "success", payload });
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const payload = await getPostById(req.params.id);
    res.status(200).json({ result: "success", payload });
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message });
  }
});

router.post("/image", async (req, res) => {
  upload(req, res, (err) => {
    console.log(req.file);
  });

  // console.log(req);

  // try {
  //   const payload = await createPost(req);
  //   res.status(201).json({ result: "success", payload });
  // } catch (err) {
  //   res.status(500).json({ result: "error", payload: err.message });
  // }
});

router.get("/posts/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const posts = await getPostsByUserId(userId);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message });
  }
});

router.post("/", handleFileUpload, async (req, res) => {
  console.log(req.body);
  try {
    const payload = await createPost(req);
    res.status(201).json({ result: "success", payload });
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const payload = await updatePostById(req.params.id, req.body);
    res.status(200).json({ result: "success", payload });
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const payload = await deletePostById(req.params.id);
    res.status(200).json({ result: "success", payload });
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message });
  }
});

module.exports = router;
