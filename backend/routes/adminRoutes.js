const express = require('express');
const router = express.Router();
const { getAllUsers, getAllOrders } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware'); // Your JWT middleware
const { isAdmin } = require('../middleware/authMiddleware'); // The new admin middleware

// Protect all routes in this file with both middlewares
router.use(protect, isAdmin); 

router.route('/users').get(getAllUsers);
router.route('/orders').get(getAllOrders);

module.exports = router;
