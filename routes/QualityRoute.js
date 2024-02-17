const express = require("express");
const router = express.Router();
const { upload } = require("../Upload");
const {
  createQuality,
  editQuality,
  getQuality,
} = require("../controllers/QualityController");

router.post("/createCategory", upload.array("images", 2), createQuality);
router.get("/getCategory", getQuality);
router.put("/editCategory", upload.array("images", 5), editQuality);
//router.get("/deleteCategory", deleteCategory);
module.exports = router;
