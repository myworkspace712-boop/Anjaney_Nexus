const User = require('../models/User');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../utils/emailService');

// ─── Helper: generate random hex token ───
const generateCryptoToken = () => crypto.randomBytes(20).toString('hex'); // Updated to 20 bytes

// @desc    Register a Customer (and conditionally a Seller)
// @route   POST /api/auth/register
const registerCustomer = async (req, res) => {
  try {
    const { name, email, password, role, sellerInfo } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (name.length < 2 || name.length > 50) {
      return res.status(400).json({ success: false, message: 'Name must be 2-50 characters' });
    }
    if (password.length < 6 || password.length > 100) {
      return res.status(400).json({ success: false, message: 'Password must be 6-100 characters' });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    const sanitizedEmail = email.toLowerCase().trim();
    const userExists = await User.findOne({ email: sanitizedEmail });
    
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    if (role === 'admin' || role === 'superadmin') {
      return res.status(403).json({ success: false, message: 'Admins must be registered through the dedicated admin endpoint.' });
    }

    const verificationToken = generateCryptoToken();

    console.log('--- MONGOOSE CREATE PAYLOAD ---');
    console.log('Token:', verificationToken);
    console.log('Expiry:', new Date(Date.now() + 30 * 60 * 1000));
    console.log('Full Object:', {
      name,
      email: sanitizedEmail,
      role: role && ['customer', 'seller'].includes(role) ? role : 'customer',
      isEmailVerified: false,
      emailVerificationToken: verificationToken,
      emailVerificationExpiry: new Date(Date.now() + 30 * 60 * 1000)
    });
    console.log('-------------------------------');

    const user = await User.create({
      name,
      email: sanitizedEmail,
      password,
      role: role && ['customer', 'seller'].includes(role) ? role : 'customer',
      sellerInfo: role === 'seller' ? sellerInfo : undefined,
      isEmailVerified: false,
      emailVerificationToken: verificationToken,
      emailVerificationExpiry: new Date(Date.now() + 30 * 60 * 1000) // 30 mins
    });

    try {
      await sendVerificationEmail(user.email, verificationToken);
    } catch (emailErr) {
      console.error('Email send failed:', emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Registration successful! Please check your email to verify your account.',
      requiresVerification: true,
      user: { name: user.name, email: user.email } // Returns saved details as requested
    });

  } catch (error) {
    console.log('--- ERROR IN registerCustomer ---');
    console.error("Original Error:", error);
    require('fs').writeFileSync('last_error.log', error.stack || error.message);
    console.log(error); // Logs the full original error stack

    // Catch MongoDB Duplicate Key Error (e.g., email already exists)
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ success: false, message: `An account with that ${field} already exists.` });
    }
    // Catch Mongoose Validation Errors (missing required fields)
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, message: "Validation Failed", errors: messages });
    }
    // Catch all other generic errors
    return res.status(500).json({ success: false, message: error.message, errorName: error.name });
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

// @desc    Verify Email via Token (POST)
// @route   POST /api/auth/verify
const verifyEmail = async (req, res) => {
  try {
    console.log('--- VERIFY EMAIL POST HIT ---');
    console.log('req.body received:', req.body);
    
    // Extract token from request body instead of URL params
    const { token } = req.body;
    
    console.log('Extracted token:', token);
    console.log('-----------------------------');

    if (!token) {
      return res.status(400).json({ success: false, message: 'Verification token is required in the request body' });
    }

    // Find the user with this token where the expiry is greater than now
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpiry: { $gt: Date.now() }
    }).select('+emailVerificationToken +emailVerificationExpiry');

    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid or expired verification token' 
      });
    }

    // Update user verification status
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;

    // Safely save the document without triggering strict validation on fields we didn't query for
    await user.save({ validateModifiedOnly: true });

    res.json({
      success: true,
      message: 'Email successfully verified. You can now log in.'
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// @desc    Seller Application (Creates a pending seller)
// @route   POST /api/seller_auth/apply
const applySeller = async (req, res) => {
  try {
    const { name, email, password, shopName } = req.body || {};

    if (!name || !email || !password || !shopName) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, password, and shopName' });
    }

    const sanitizedEmail = email.toLowerCase().trim();
    const userExists = await User.findOne({ email: sanitizedEmail });
    
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email: sanitizedEmail,
      password,
      role: 'customer', // Initially just a customer until approved
      sellerStatus: 'pending', // Hardcoded as pending
      sellerInfo: { shopName }
    });

    res.status(201).json({
      success: true,
      message: 'Seller application submitted successfully and is pending admin approval.',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        sellerStatus: user.sellerStatus
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Register an Admin (Should normally be internal/secured)
// @route   POST /api/admin_auth/register
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
    }

    const sanitizedEmail = email.toLowerCase().trim();
    const userExists = await User.findOne({ email: sanitizedEmail });
    
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email: sanitizedEmail,
      password,
      role: 'admin' // Hardcoded to admin, ignores req.body.role
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '30d' }
    );

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
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Approve a pending seller
// @route   PUT /api/admin/approve-seller/:id
const approveSeller = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.sellerStatus !== 'pending') {
      return res.status(400).json({ success: false, message: 'User is not a pending seller' });
    }

    // Upgrade role and approve status
    user.role = 'seller';
    user.sellerStatus = 'approved';
    await user.save();

    res.json({
      success: true,
      message: 'Seller has been approved successfully.',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        sellerStatus: user.sellerStatus
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = { registerCustomer, verifyUser, verifyEmail, applySeller, registerAdmin, approveSeller };