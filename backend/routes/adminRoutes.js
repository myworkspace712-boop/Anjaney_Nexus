const express = require('express');
const router = express.Router();
const { registerAdmin, verifyAdmin } = require('../controllers/adminAuthController');
const { protect, admin: isAdmin } = require('../middleware/auth'); // Adjusted import path and middleware name


// POST /api/admin_auth/register
router.post('/register', registerAdmin);

// GET /api/admin_auth/verify
router.get('/verify', protect, isAdmin, verifyAdmin);

module.exports = router;
