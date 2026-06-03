const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    productId: { type: Number, required: true }, // Using Number because Product.id is Number
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: String, required: true },
    image: { type: String }
});

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
        fullName: { type: String, required: true },
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true }
    },
    paymentMethod: { type: String, default: 'Credit Card (Simulated)' },
    paymentStatus: { type: String, default: 'Paid' },
    status: { 
        type: String, 
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], 
        default: 'Pending' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
