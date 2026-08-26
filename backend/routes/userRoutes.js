const express = require('express');
const router = express.Router();
const { registerCustomer, verifyUser } = require('../controllers/authController');
const { protect } = require('../middleware/auth'); // adjusted from authMiddleware


// POST /api/users/register
router.post('/register', registerCustomer);

// GET /api/users/verify
router.get('/verify', protect, verifyUser);

module.exports = router;
