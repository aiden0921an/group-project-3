const router = require("express").Router();
// const staticRoutes = require("./static.routes");
const apiRoutes = require("./api");

const express = require("express");
const path = require("path");
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// router.use("/", staticRoutes);
router.use("/api", apiRoutes);

module.exports = router;
