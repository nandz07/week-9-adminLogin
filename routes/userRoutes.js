
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route: GET /users/
router.get('/login', userController.login);
router.get('/signup', userController.signupGet);
router.get('/', userController.homeGet);
router.get('/logout', userController.logoutGet);


// Route: POST /users
router.post('/signup', userController.signupPost);
router.post('/login', userController.loginPost);


module.exports = router;


