const express = require('express');
const router = express.Router();
const {createUser, userList} = require('../controllers/UserController');


router.post('/createUser', createUser);
router.get('/userList', userList)
module.exports = router;

