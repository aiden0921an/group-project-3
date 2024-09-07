const router = require("express").Router();

const postRoutes = require("./post.routes");
const userRoutes = require("./user.routes");
const paymentRoutes = require("./payment.routes");

router.use("/post", postRoutes);
router.use("/user", userRoutes);
router.use("/payment", paymentRoutes);

module.exports = router;
