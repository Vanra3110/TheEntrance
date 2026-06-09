const express = require('express');
const router = express.Router();
const { getUsers, deleteUser, toggleWishlist } = require('../Controllers/userController');

router.get('/', getUsers);
router.delete('/:id', deleteUser);
router.put('/wishlist', toggleWishlist);

module.exports = router;
