const express = require("express");
const router = express.Router();
const {
  getheroSection,
} = require("../controllers/volderController");

router.get("/getHeroSection", getheroSection);

module.exports = router;
