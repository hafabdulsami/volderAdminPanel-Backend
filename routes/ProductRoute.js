const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProduct,
} = require("../controllers/ProductController");

router.post("/createProduct", createProduct);
router.get("/getProduct", getProduct);
module.exports = router;
