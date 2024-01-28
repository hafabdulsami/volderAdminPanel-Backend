const express = require('express');
const router = express.Router();
const {createCategory} = require('../controllers/CategoryController');


router.post('/createcategory', createCategory);

module.exports = router;

