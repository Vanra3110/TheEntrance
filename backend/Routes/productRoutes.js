const express = require('express');
const router = express.Router();
const { getProducts, seedProducts, getProductById, updateProduct, deleteProduct, createProduct, getRelatedProducts } = require('../Controllers/productController');
const adminAuth = require('../Middleware/adminAuth');

router.get('/', getProducts);
router.post('/', adminAuth, createProduct);
router.post('/seed', adminAuth, seedProducts);
router.get('/:id/related', getRelatedProducts);
router.get('/:id', getProductById);
router.put('/:id', adminAuth, updateProduct);
router.delete('/:id', adminAuth, deleteProduct);

module.exports = router;
