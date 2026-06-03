const express = require('express');
const router = require('express').Router();
const orderController = require('../Controllers/orderController');

// Create a new order
router.post('/', orderController.createOrder);

// Get orders for a specific user
router.get('/user/:userId', orderController.getUserOrders);

// Get all orders (Admin only)
router.get('/', orderController.getAllOrders);

// Update order status (Admin only)
router.put('/:id/status', orderController.updateOrderStatus);

module.exports = router;
