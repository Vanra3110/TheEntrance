const User = require('../Models/User');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');

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
            // Send Welcome Email
            try {
                await sendEmail({
                    email: user.email,
                    subject: 'Welcome to The Entrance!',
                    message: `Hi ${user.first_name},\n\nWelcome to The Entrance! We're excited to have you on board.`,
                });
            } catch (err) {
                console.error("Welcome email failed", err);
            }

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

// @desc    Forgot Password
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: 'There is no user with that email' });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        user.resetPasswordOTP = otp;
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save({ validateBeforeSave: false });

        try {
            await sendEmail({
                email: user.email,
                subject: 'Password Reset OTP',
                message: `Your password reset OTP is: ${otp}\n\nIt is valid for 10 minutes.`,
            });
            res.status(200).json({ message: 'Email sent' });
        } catch (error) {
            user.resetPasswordOTP = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });
            return res.status(500).json({ message: 'Email could not be sent' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
    try {
        const { email, otp, password } = req.body;

        const user = await User.findOne({
            email,
            resetPasswordOTP: otp,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Set new password
        user.password = password;
        user.resetPasswordOTP = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    forgotPassword,
    resetPassword
};
