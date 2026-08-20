const User = require('../models/User');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


// @desc    Register a standard User
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    // 1. Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
    }

    // 2. Database connection guard
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ success: false, message: 'Database unavailable' });
    }

    // 3. Prevent duplicates with sanitized email
    const sanitizedEmail = email.toLowerCase().trim();
    const userExists = await User.findOne({ email: sanitizedEmail });
    
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    // 4. Create the standard user in MongoDB Atlas
    const user = await User.create({
      name,
      email: sanitizedEmail,
      password,
      role: 'user' // Explicitly sets standard user role
    });

    // 5. Generate Auth Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '30d' }
    );

    // 6. Return Success Response
    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    // 7. Force the REAL error to show up in Postman if something crashes
    res.status(500).json({ 
      success: false, 
      message: error.message,
      fullError: error.stack
    });
  }
};

// @desc    Verify User Token / Get Current User
// @route   GET /api/auth/verify
const verifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    // This forces your server to send the REAL error directly to Postman
    res.status(500).json({ 
      success: false, 
      message: error.message,
      fullError: error.stack 
    });
  }
};


module.exports = { registerUser, verifyUser };