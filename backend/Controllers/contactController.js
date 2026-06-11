const ContactMessage = require('../Models/ContactMessage');

// @desc    Create a new contact message
// @route   POST /api/contact
// @access  Public
const createMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const newMessage = new ContactMessage({
            name,
            email,
            subject,
            message
        });

        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        console.error('Error creating contact message:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private (Admin)
const getMessages = async (req, res) => {
    try {
        const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching contact messages:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update contact message status
// @route   PATCH /api/contact/:id
// @access  Private (Admin)
const updateMessageStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['Unread', 'Noted', 'View Later', 'Resolved'];

        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const message = await ContactMessage.findById(req.params.id);

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        message.status = status;
        const updatedMessage = await message.save();

        res.status(200).json(updatedMessage);
    } catch (error) {
        console.error('Error updating message status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createMessage,
    getMessages,
    updateMessageStatus
};
