// server/routes/route.js
const express = require('express');
const router = express.Router();
const {getUser, getUsers, updateUser, deleteUser} = require('../controller/userController');
const {signup, login} = require('../controller/auth.controller');
const { allowIfLoggedin, grantAccess } = require('../middlewares/grantAccess')
router.post('/signup', signup);

router.post('/login', login);

router.get('/user/:userId', allowIfLoggedin, getUser);

router.get('/users', allowIfLoggedin, grantAccess('readAny', 'tasks'), getUsers);

router.put('/user/:userId', allowIfLoggedin, grantAccess('updateAny', 'tasks'), updateUser);

router.delete('/user/:userId', allowIfLoggedin, grantAccess('deleteAny', 'tasks'), deleteUser);

module.exports = router;