const router = require("express").Router();
const staticRoutes = require("./static.routes");
const apiRoutes = require("./api");

router.use("/", staticRoutes);
router.use("/api", apiRoutes);

module.exports = router;
