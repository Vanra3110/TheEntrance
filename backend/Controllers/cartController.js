const User = require('../Models/User');

// @desc    Update user cart
// @route   PUT /api/cart
// @access  Public (should ideally be protected, but keeping it simple based on existing flow)
const updateCart = async (req, res) => {
    try {
        const { email, cartItems } = req.body;
        
        // Find user by email
        const user = await User.findOne({ email });
        
        if (user) {
            user.cartItems = cartItems || {};
            user.markModified('cartItems');
            await user.save();
            res.status(200).json(user.cartItems);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ message: 'Server error while updating cart' });
    }
};

// @desc    Get user cart
// @route   GET /api/cart/:email
// @access  Public
const getCart = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });

        if (user) {
            res.status(200).json(user.cartItems || {});
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Server error while fetching cart' });
    }
};

module.exports = {
    updateCart,
    getCart
};
