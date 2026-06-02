const express = require('express');
const router = express.Router();
const { getProducts, seedProducts, getProductById, updateProduct, deleteProduct, createProduct } = require('../Controllers/productController');

router.get('/', getProducts);
router.post('/', createProduct);
router.post('/seed', seedProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
