const User = require('../Models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, phone, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            first_name,
            last_name,
            email,
            phone,
            password,
            cartItems: {},
            isAdmin: email === 'my111tab.mt@gmail.com'
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone: user.phone,
                image: user.image,
                address: user.address,
                city: user.city,
                state: user.state,
                postalCode: user.postalCode,
                country: user.country,
                cartItems: user.cartItems,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone: user.phone,
                image: user.image,
                address: user.address,
                city: user.city,
                state: user.state,
                postalCode: user.postalCode,
                country: user.country,
                cartItems: user.cartItems,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update user cart
// @route   PUT /api/auth/cart
// @access  Public (should ideally be protected, but keeping it simple for now based on user flow)
const updateCart = async (req, res) => {
    try {
        const { email, cartItems } = req.body;
        
        // Find user by email (in a fully secure app, we'd use req.user._id from a auth middleware)
        const user = await User.findOne({ email });
        
        if (user) {
            user.cartItems = cartItems;
            user.markModified('cartItems');
            await user.save();
            res.json(user.cartItems);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile/:id
// @access  Public (should ideally be protected)
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.json({
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone: user.phone,
                image: user.image,
                address: user.address,
                city: user.city,
                state: user.state,
                postalCode: user.postalCode,
                country: user.country,
                isAdmin: user.isAdmin,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile/:id
// @access  Public (should ideally be protected)
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.first_name = req.body.first_name || user.first_name;
            user.last_name = req.body.last_name || user.last_name;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;
            user.image = req.body.image || user.image;
            user.address = req.body.address || user.address;
            user.city = req.body.city || user.city;
            user.state = req.body.state || user.state;
            user.postalCode = req.body.postalCode || user.postalCode;
            user.country = req.body.country || user.country;
            
            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                first_name: updatedUser.first_name,
                last_name: updatedUser.last_name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                image: updatedUser.image,
                address: updatedUser.address,
                city: updatedUser.city,
                state: updatedUser.state,
                postalCode: updatedUser.postalCode,
                country: updatedUser.country,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id),
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    updateCart,
    getUserProfile,
    updateUserProfile
};
