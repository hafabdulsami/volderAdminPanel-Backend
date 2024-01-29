const express = require('express');
const router = express.Router();
const {createCategory, getCategory} = require('../controllers/CategoryController');


router.post('/createCategory', createCategory);
router.get('/getCategory', getCategory)
module.exports = router;

