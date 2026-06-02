const express = require('express');
const router = express.Router();
const { getUsers, deleteUser } = require('../Controllers/userController');

router.get('/', getUsers);
router.delete('/:id', deleteUser);

module.exports = router;
