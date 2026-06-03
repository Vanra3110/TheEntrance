const Order = require('../Models/Order');
const Product = require('../Models/Product');

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
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: "Server error" });
    }
};
