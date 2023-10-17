const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// sign up
router.post('/signup', userController.signup);

// sign in
router.post('/signin', userController.signin);

// logout
router.post('/logout', userController.logout);

module.exports = router;
