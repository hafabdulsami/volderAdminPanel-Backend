const express = require("express");
const router = express.Router();
const { upload } = require("../Upload");
const {
  createProduct,
  getProduct,
  editProduct,
} = require("../controllers/ProductController");

router.post("/createProduct",upload.array("images",5) ,createProduct);
router.get("/getProduct", getProduct);
router.put("/editProduct", editProduct);
module.exports = router;
