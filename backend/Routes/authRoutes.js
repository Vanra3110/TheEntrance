const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile, forgotPassword, resetPassword } = require('../Controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile/:id', getUserProfile);
router.put('/profile/:id', updateUserProfile);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
