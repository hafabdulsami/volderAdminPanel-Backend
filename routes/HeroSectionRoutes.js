const express = require("express");
const router = express.Router();
const { upload } = require("../Upload");
const {
  createHeroSection,
  getheroSection,
  editHeroSection
} = require("../controllers/HeroSectionController");

router.post("/createHeroSection", upload.array("images", 2), createHeroSection);
router.get("/getHeroSection", getheroSection);
router.put("/editHeroSection", upload.array("images",2), editHeroSection);
module.exports = router;
