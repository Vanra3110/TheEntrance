const Order = require('../Models/Order');
const Product = require('../Models/Product');
const User = require('../Models/User');
const sendEmail = require('../utils/sendEmail');
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { userId, items, totalAmount, shippingAddress } = req.body;

        if (!userId || !items || items.length === 0 || !totalAmount || !shippingAddress) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newOrder = new Order({
            userId,
            items,
            totalAmount,
            shippingAddress
        });

        const savedOrder = await newOrder.save();

        // Optionally, reduce stock for the purchased items
        for (const item of items) {
            await Product.findOneAndUpdate(
                { id: item.productId },
                { $inc: { stock: -item.quantity } }
            );
        }

        // Fetch user to send confirmation email
        const user = await User.findById(userId);
        if (user) {
            const productNames = items.map(i => `${i.quantity}x ${i.name}`).join(', ');
            try {
                await sendEmail({
                    email: user.email,
                    subject: 'Order Confirmation - The Entrance',
                    message: `Hi ${user.first_name},\n\nYour order for ${items.length} item(s) totaling $${totalAmount} has been confirmed.\n\nProducts:\n${productNames}\n\nThank you for shopping with us!`,
                });
            } catch (err) {
                console.error("Order confirmation email failed", err);
            }
        }

        res.status(201).json(savedOrder);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get orders for a specific user
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all orders (Admin only)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('userId', 'first_name last_name email').sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error("Error fetching all orders:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update order status (Admin only)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id).populate('userId', 'first_name email');

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;
        const updatedOrder = await order.save();

        if (order.userId && ['Shipped', 'Delivered', 'Cancelled'].includes(status)) {
            const productNames = order.items.map(i => `${i.quantity}x ${i.name}`).join(', ');
            try {
                await sendEmail({
                    email: order.userId.email,
                    subject: `Order Update: ${status} - The Entrance`,
                    message: `Hi ${order.userId.first_name},\n\nThe status of your order has been updated to: ${status}.\n\nOrder contents:\n${productNames}\n\nThank you!`,
                });
            } catch (err) {
                console.error("Order status update email failed", err);
            }
        }

        res.json(updatedOrder);
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Create a Razorpay Order
exports.createRazorpayOrder = async (req, res) => {
    try {
        const { totalAmount } = req.body;
        if (!totalAmount) return res.status(400).json({ message: "Total amount is required" });

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = {
            amount: Math.round(totalAmount * 100), // amount in smallest currency unit (paise)
            currency: "INR",
            receipt: "receipt_order_" + Date.now(),
        };

        const order = await instance.orders.create(options);
        if (!order) return res.status(500).json({ message: "Some error occured" });

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Verify Razorpay Payment and create the final order
exports.verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderData
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Create the order using the provided orderData
            const { userId, items, totalAmount, shippingAddress } = orderData;

            if (!userId || !items || items.length === 0 || !totalAmount || !shippingAddress) {
                return res.status(400).json({ message: "Missing required fields in orderData" });
            }

            const newOrder = new Order({
                userId,
                items,
                totalAmount,
                shippingAddress,
                status: 'Processing',
                paymentId: razorpay_payment_id
            });

            const savedOrder = await newOrder.save();

            // Reduce stock
            for (const item of items) {
                await Product.findOneAndUpdate(
                    { id: item.productId },
                    { $inc: { stock: -item.quantity } }
                );
            }

            // Send confirmation email
            const user = await User.findById(userId);
            if (user) {
                const productNames = items.map(i => `${i.quantity}x ${i.name}`).join(', ');
                try {
                    await sendEmail({
                        email: user.email,
                        subject: 'Order Confirmation - The Entrance',
                        message: `Hi ${user.first_name},\n\nYour order for ${items.length} item(s) totaling ₹${totalAmount} has been confirmed.\n\nPayment ID: ${razorpay_payment_id}\n\nProducts:\n${productNames}\n\nThank you for shopping with us!`,
                    });
                } catch (err) {
                    console.error("Order confirmation email failed", err);
                }
            }

            res.status(200).json({
                message: "Payment successfully verified",
                order: savedOrder
            });
        } else {
            res.status(400).json({ message: "Invalid Signature" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
