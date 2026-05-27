const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateCart } = require('../Controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/cart', updateCart);


module.exports = router;
