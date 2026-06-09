const User = require('../Models/User');

const adminAuth = async (req, res, next) => {
    try {
        const adminId = req.headers['x-admin-id'];

        if (!adminId) {
            return res.status(401).json({ message: "Access denied. No admin ID provided." });
        }

        const user = await User.findById(adminId);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: "Forbidden. Admin privileges required." });
        }

        req.admin = user; // Attach admin user to request
        next();
    } catch (error) {
        console.error("Admin Auth Error:", error);
        res.status(500).json({ message: "Internal server error during authentication" });
    }
};

module.exports = adminAuth;
