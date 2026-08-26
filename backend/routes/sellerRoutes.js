const express = require('express');
const router = express.Router();
const { registerSeller } = require('../controllers/sellerAuthController');


// Map the POST request to the controller function
router.post('/register', registerSeller);

module.exports = router;
