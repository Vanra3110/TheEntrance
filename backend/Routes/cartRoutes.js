const express = require('express');
const router = express.Router();
const { updateCart, getCart } = require('../Controllers/cartController');

router.put('/', updateCart);
router.get('/:email', getCart);

module.exports = router;
