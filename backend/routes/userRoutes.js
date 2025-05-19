const express = require('express');
const router = express.Router();
const { getCurrentUser } = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');

router.get('/me', authenticate(), getCurrentUser);

module.exports = router;