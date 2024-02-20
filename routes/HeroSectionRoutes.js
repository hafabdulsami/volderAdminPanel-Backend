const express = require("express");
const router = express.Router();
const { upload } = require("../Upload");
const {
  createHeroSection
} = require("../controllers/HeroSectionController");

router.post("/createHeroSection", upload.array("images", 5), createHeroSection);
module.exports = router;
