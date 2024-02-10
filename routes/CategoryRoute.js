const express = require("express");
const router = express.Router();
const {upload} = require("../Upload");
const {
  createCategory,
  getCategory,
  editCategory,
  
} = require("../controllers/CategoryController");

router.post("/createCategory",upload.array("images",2),createCategory);
router.get("/getCategory", getCategory);
router.put("/editCategory", editCategory);
//router.get("/deleteCategory", deleteCategory);
module.exports = router;