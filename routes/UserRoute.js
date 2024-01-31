const express = require('express');
const router = express.Router();
const {createUser, userList, Edituser} = require('../controllers/UserController');


router.post('/createUser', createUser);
router.get('/userList', userList)
router.put('/editUser', Edituser)
module.exports = router;

