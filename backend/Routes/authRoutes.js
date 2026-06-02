const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateCart, getUserProfile, updateUserProfile } = require('../Controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/cart', updateCart);
router.get('/profile/:id', getUserProfile);
router.put('/profile/:id', updateUserProfile);

module.exports = router;
