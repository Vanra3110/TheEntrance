const express = require('express');
const router = require('express').Router();
const orderController = require('../Controllers/orderController');
const adminAuth = require('../Middleware/adminAuth');

// Razorpay specific routes
router.post('/create-razorpay-order', orderController.createRazorpayOrder);
router.post('/verify-payment', orderController.verifyPayment);

// Create a new order (legacy simulation, kept for fallback/reference)
router.post('/', orderController.createOrder);

// Get orders for a specific user
router.get('/user/:userId', orderController.getUserOrders);

// Get all orders (Admin only)
router.get('/', adminAuth, orderController.getAllOrders);

// Update order status (Admin only)
router.put('/:id/status', adminAuth, orderController.updateOrderStatus);

module.exports = router;
