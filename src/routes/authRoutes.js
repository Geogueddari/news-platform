const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signin', authController.signIn);
router.post('/signup', authController.signUp);
router.post('/forgot-password', authController.resetPassword);


module.exports = router;