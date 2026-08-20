const express = require('express');
const router = express.Router();
const { registerUser, verifyUser } = require('../controllers/authController');
const { protect } = require('../middleware/auth'); // adjusted from authMiddleware


// POST /api/users/register
router.post('/register', registerUser);

// GET /api/users/verify
router.get('/verify', protect, verifyUser);

module.exports = router;
