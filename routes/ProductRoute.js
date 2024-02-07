const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProduct,
  editProduct,
} = require("../controllers/ProductController");

router.post("/createProduct", createProduct);
router.get("/getProduct", getProduct);
router.put("/editProduct", editProduct);
module.exports = router;
