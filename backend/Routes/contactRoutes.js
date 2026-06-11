const express = require('express');
const router = express.Router();
const {
    createMessage,
    getMessages,
    updateMessageStatus
} = require('../Controllers/contactController');

// Define routes
router.post('/', createMessage);
router.get('/', getMessages);
router.patch('/:id', updateMessageStatus);

module.exports = router;
