const express = require('express');
const router = express.Router();
const {createProduct} = require('../controllers/ProductController');


router.post('/createProduct', createProduct);
module.exports = router;

