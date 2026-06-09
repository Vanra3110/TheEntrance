const User = require('../Models/User');

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User removed" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Toggle wishlist item
exports.toggleWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const index = user.wishlist.indexOf(productId);
        if (index === -1) {
            user.wishlist.push(productId);
        } else {
            user.wishlist.splice(index, 1);
        }
        
        await user.save();
        res.json({ wishlist: user.wishlist, message: "Wishlist updated" });
    } catch (error) {
        console.error("Error toggling wishlist:", error);
        res.status(500).json({ message: "Server error" });
    }
};
