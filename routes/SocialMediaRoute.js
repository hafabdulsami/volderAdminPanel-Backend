const express = require("express");
const router = express.Router();
const { upload } = require("../Upload");
const {
  createSocialMedia,
  getSocialMedia,
  editSocialMedia
} = require("../controllers/SocialMediaController");

router.post("/createSocialMedia", upload.none(), createSocialMedia);
router.get("/getSocialMedia", getSocialMedia);
router.put("/editSocialMedia", upload.none(), editSocialMedia);
//router.get("/deleteCategory", deleteCategory);
module.exports = router;
