const express = require("express");
const router = express.Router();
const { upload } = require("../Upload");
const {
  createQuality,
  editQuality,
  getQuality,
} = require("../controllers/QualityController");

router.post("/createQuality", upload.array("images", 2), createQuality);
router.get("/getQuality", getQuality);
router.put("/editQuality", upload.array("images", 5), editQuality);
//router.get("/deleteCategory", deleteCategory);
module.exports = router;
