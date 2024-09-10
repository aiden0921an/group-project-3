const router = require("express").Router();

const categoryRoutes = require("./category.routes");
const postRoutes = require("./post.routes");
const userRoutes = require("./user.routes");
const paymentRoutes = require("./payment.routes");

router.use("/category", categoryRoutes);
router.use("/post", postRoutes);
router.use("/user", userRoutes);
router.use("/payment", paymentRoutes);

module.exports = router;
