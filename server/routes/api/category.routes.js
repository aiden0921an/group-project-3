const router = require("express").Router();
const upload = require("../../middlewares/uploadMiddleware");

const {
  getAllItems,
  getItemById,
  createItem,
  updateItemById,
  deleteItemById,
} = require("../../controllers/category.controller");

router.get("/", async (req, res) => {
  try {
    const payload = await getAllItems();
    res.status(200).json({ result: "success", payload });
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const payload = await getItemById(req.params.id);
    res.status(200).json({ result: "success", payload });
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const payload = await createItem(req);
    res.status(201).json({ result: "success", payload });
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const payload = await updateItemById(req.params.id, req.body);
    res.status(200).json({ result: "success", payload });
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const payload = await deleteItemById(req.params.id);
    res.status(200).json({ result: "success", payload });
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message });
  }
});

module.exports = router;
