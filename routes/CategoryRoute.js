const express = require('express');
const router = express.Router();
const {createCategory, getCategory, editCategory} = require('../controllers/CategoryController');


router.post('/createCategory', createCategory);
router.get('/getCategory', getCategory)
router.put('/editCategory', editCategory)
module.exports = router;

