const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { sendEmail, transporter } = require('../utils/sendEmail');
const bcrypt = require('bcryptjs');

const sendVerification = async (user) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Missing EMAIL_USER or EMAIL_PASS in .env file.");
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const verifyUrl = `http://localhost:5173/verify-email/${user.emailVerificationToken}`;

  // The email payload
  await transporter.sendMail({
    from: `"Anjaney Nexus" <${process.env.EMAIL_USER}>`,

    // 🎯 STRICT DYNAMIC TARGETING: Grabs the exact email the user typed in
    to: user.email, 

    subject: "Verify Your Account - Anjaney Nexus",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Verify Your Email</h2>
        <p>Hello, please verify your account (${user.email}) by clicking below:</p>
        <a href="${verifyUrl}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
      </div>
    `
  });
};

// Global check to diagnose the connection instantly
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  const testTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  testTransporter.verify((error, success) => {
    console.log("\n================ [ SMTP DIAGNOSTICS ] ================");
    if (error) {
      console.error("❌ SMTP CONNECTION FAILED!");
      console.error("Reason:", error.message);
      console.error("Check your .env file. Ensure your App Password has no spaces.");
    } else {
      console.log("✅ SMTP Connection Successful! Server is ready to send emails.");
    }
    console.log("======================================================\n");
  });
} else {
  console.log("\n⚠️ SMTP DIAGNOSTICS: EMAIL_USER or EMAIL_PASS is missing from .env\n");
}
// ─── Helper: generate random hex token ───
const generateCryptoToken = () => crypto.randomBytes(20).toString('hex'); // Updated to 20 bytes

// @desc    Register a Customer (and conditionally a Seller)
// @route   POST /api/auth/register
const registerCustomer = async (req, res) => {
  console.log("[CONTROLLER] Register function hit with body:", req.body);
  try {
    const { name, email, password, role, sellerInfo } = req.body || {};
    const normalizedEmail = email ? email.toLowerCase().trim() : '';

    if (!name || !normalizedEmail || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (name.length < 2 || name.length > 50) {
      return res.status(400).json({ success: false, message: 'Name must be 2-50 characters' });
    }
    if (password.length < 6 || password.length > 100) {
      return res.status(400).json({ success: false, message: 'Password must be 6-100 characters' });
    }
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    const userExists = await User.findOne({ email: normalizedEmail });
    
    if (userExists) {
      if (userExists.isEmailVerified) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      } else {
        // User exists but never verified. Delete the ghost record so they can try again.
        console.log("Overwriting unverified ghost user...");
        await User.findOneAndDelete({ email: normalizedEmail });
      }
    }

    const COMPANY_DOMAIN = "@anjaneynexus.com";
    const isUserAdmin = normalizedEmail.endsWith(COMPANY_DOMAIN);
    const assignedRole = isUserAdmin ? 'admin' : (role && ['customer', 'seller'].includes(role) ? role : 'customer');
    
    const verificationToken = generateCryptoToken();

    console.log("REGISTRATION ATTEMPT:", normalizedEmail);
    console.log("MongoDB Collection being used (Register):", User.collection.collectionName);
    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      role: assignedRole,
      sellerInfo: assignedRole === 'seller' ? sellerInfo : undefined,
      isEmailVerified: false,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: Date.now() + 5 * 60 * 1000 // 5 mins
    });

    try {
      await sendVerification(user); // Pass the newly registered user object
      console.log(`✅ Verification email dynamically sent to ${user.email}`);
    } catch (error) {
      console.error(`🛑 Failed to send email to ${user.email}. Reason:`, error.message);
      // Return 500 to frontend for the resend route, but allow register route to proceed
    }

      // 3. GUARANTEED SUCCESS RESPONSE
      return res.status(201).json({ 
        message: "User registered successfully!", 
        user: { email: user.email } 
      });

  } catch (error) {
    console.error("\n[BACKEND CRASH LOG]:", error);

    require('fs').writeFileSync('last_error.log', error.stack || error.message);

    // Handle MongoDB Duplicate Email Error
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: "This email is already registered. Please use a different email." 
      });
    }
    // Catch Mongoose Validation Errors (missing required fields)
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ 
        message: `Validation Failed: ${messages.join(', ')}` 
      });
    }
    
    // Expose the EXACT error message to the frontend, no generic strings
    if (!res.headersSent) {
      console.error("\n[ BACKEND CRASH ]:", error.message);
      return res.status(500).json({ 
        message: `Email Dispatch Failed: ${error.message || "Unknown SMTP error"}` 
      });
    }
  }
};

// @desc    Register Multiple Customers (Bulk)
// @route   POST /api/auth/bulk-register-customers
const bulkRegisterCustomers = async (req, res) => {
  try {
    const { customers } = req.body;
    
    if (!customers || !Array.isArray(customers) || customers.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide an array of customers' });
    }

    const createdUsers = [];
    const errors = [];

    for (let i = 0; i < customers.length; i++) {
      const userReq = customers[i];
      const { name, email, password } = userReq;
      
      if (!name || !email || !password) {
        errors.push({ index: i, email, message: 'Missing fields' });
        continue;
      }

      const normalizedEmail = email.toLowerCase().trim();
      
      const userExists = await User.findOne({ email: normalizedEmail });
      if (userExists) {
        errors.push({ index: i, email: normalizedEmail, message: 'User already exists' });
        continue;
      }

      try {
        const verificationToken = generateCryptoToken();
        const user = await User.create({
          name,
          email: normalizedEmail,
          password,
          role: 'customer', // Default to customer for now
          emailVerificationToken: verificationToken,
          emailVerificationExpires: Date.now() + 5 * 60 * 1000, // 5 minutes
          isEmailVerified: false
        });
        
        const currentClientUrl = req.headers.origin || process.env.CLIENT_URL || 'http://localhost:5173';
        const verifyUrl = `${currentClientUrl}/verify-email/${verificationToken}`;
        const emailSubject = "Verify Your Account";
        const emailHtml = `
          <p>Hi ${user.name},</p>
          <p>Please verify your email address by clicking the link below:</p>
          <a href="${verifyUrl}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
          <p>This link will expire in 5 minutes.</p>
        `;

        await sendEmail(user.email, emailSubject, "Please verify your email", emailHtml);
        
        createdUsers.push(user);
      } catch (err) {
        errors.push({ index: i, email: normalizedEmail, message: err.message });
      }
    }

    return res.status(201).json({
      success: true,
      message: `Bulk registration complete. Users registered and verification emails sent.`,
      createdCount: createdUsers.length,
      customers: createdUsers,
      errors
    });

  } catch (error) {
    console.error("Original Error in bulkRegisterCustomers:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login User
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    if (Object.keys(req.body || {}).length === 0) {
      return res.status(400).json({ success: false, message: "Empty request body received - check Express JSON middleware" });
    }
    
    console.log("MongoDB Collection being used (Login):", User.collection.collectionName);
    console.log("Login Payload Received:", req.body);

    if (!req.body || !req.body.email) {
      return res.status(400).json({ success: false, message: "Email field is missing from the request." });
    }

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }
    const normalizedEmail = email.toLowerCase().trim();
    
    // --- DIAGNOSTICS: Fetch all emails in DB ---
    const allUsers = await User.find({}).select('email');
    const allUserEmails = allUsers.map(u => u.email);
    console.log("ALL EMAILS CURRENTLY IN DATABASE:", allUserEmails);
    // -------------------------------------------

    console.log("LOGIN SEARCH QUERY:", normalizedEmail);
    const user = await User.findOne({ email: normalizedEmail }).select('+password');
    console.log("USER FOUND IN DB:", user ? "Yes" : "No");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("PASSWORD MATCH:", isMatch);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }
    
    console.log("IS EMAIL VERIFIED:", user.isEmailVerified);
    if (user.isEmailVerified !== true) {
      try {
        const verificationToken = generateCryptoToken();
        user.emailVerificationToken = verificationToken;
        user.emailVerificationExpires = Date.now() + 5 * 60 * 1000; // 5 mins
        await user.save({ validateModifiedOnly: true });

        const currentClientUrl = req.headers.origin || process.env.CLIENT_URL || 'http://localhost:5173';
        const verifyUrl = `${currentClientUrl}/verify-email/${user.emailVerificationToken}`;
        const emailSubject = "Verify your account";
        const emailHtml = `
          <h2>Welcome back, ${user.name}!</h2>
          <p>You tried to log in, but your email is not verified yet. Please verify your email address by clicking the link below:</p>
          <a href="${verifyUrl}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
          <p>This link will expire in 5 minutes.</p>
        `;
        
        console.log(`Resending verification email to: ${user.email}`);
        await sendEmail(user.email, emailSubject, "Please verify your email", emailHtml);
      } catch (emailErr) {
        console.error('Failed to resend verification email on login:', emailErr.message);
        console.error("🚨 NODEMAILER CRASH LOG:", emailErr);
        return res.status(500).json({ success: false, message: "Your email is not verified, and we failed to send a new verification link. Please try again later." });
      }

      return res.status(403).json({ success: false, message: "Your email is not verified. A fresh verification link has just been sent to your inbox. Please check your email." });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    return res.status(200).json({ 
      success: true, 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      } 
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
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
// @route   POST /api/auth/verify-email/:token
const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token ? decodeURIComponent(req.params.token).trim() : undefined;
    
    if (!token) {
      return res.status(400).json({ success: false, message: 'Verification token is required in the URL' });
    }

    // Find the user with this token
    const user = await User.findOne({
      emailVerificationToken: token
    }).select('+emailVerificationToken +emailVerificationExpires');

    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid verification token' 
      });
    }

    // Crucial Edge Case: Handle if already verified without crashing the flow
    if (user.isEmailVerified) {
      return res.status(200).json({
        success: true,
        message: 'Account already verified.'
      });
    }

    if (user.emailVerificationExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: 'Verification link has expired. Please request a new one.'
      });
    }

    // Update user verification status
    user.isEmailVerified = true;
    
    // We intentionally DO NOT wipe the token so the developer can test the link multiple times
    // user.emailVerificationToken = undefined;
    // user.emailVerificationExpires = undefined;

    // Safely save the document
    await user.save({ validateModifiedOnly: true });

    const authToken = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' } // Standard login session length
    );

    return res.status(200).json({
      success: true,
      message: 'Email successfully verified. You can now log in.',
      token: authToken,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
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


// @desc    Delete a user
// @route   DELETE /api/auth/user/:id
const deleteUser = async (req, res) => {
  try {
    console.log("Attempting to delete user with ID/Email:", req.params.id);
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found in database to delete.' });
    }
    return res.status(200).json({ success: true, message: 'User successfully deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a user by email
// @route   DELETE /api/auth/delete-by-email
const deleteUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required in request body' });
    }
    const deletedUser = await User.findOneAndDelete({ email: email.toLowerCase().trim() });
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User with this email not found' });
    }
    return res.status(200).json({ success: true, message: `User ${email} successfully removed from database` });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/auth/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in user profile
// @route   GET /api/auth/me
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Resend Verification Email
// @route   POST /api/auth/resend-verification
const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("1. Resend requested for:", email);
    
    if (!email) return res.status(400).json({ success: false, message: 'Email required' });

    const user = await User.findOne({ email }).select('+emailVerificationToken +emailVerificationExpires');
    if (!user) {
      console.log("2. User not found in DB.");
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.isEmailVerified) {
      console.log("3. Email already verified.");
      return res.status(400).json({ success: false, message: 'Email already verified' });
    }

    // Ensure variables exist before trying to connect
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("\n🛑 RESEND FAILED: Missing .env credentials (EMAIL_USER / EMAIL_PASS)\n");
      return res.status(500).json({ success: false, message: "Server configuration error: Missing email credentials." });
    }

    // Generate new token
    const verificationToken = generateCryptoToken();
    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
    await user.save();
    
    console.log("4. Token generated successfully.");

    try {
      await sendVerification(user); // Pass the newly registered user object
      console.log(`✅ Verification email dynamically sent to ${user.email}`);
    } catch (error) {
      console.error(`🛑 Failed to send email to ${user.email}. Reason:`, error.message);
      throw error;
    }

    console.log(`✅ Resend Successful! Email delivered to ${user.email}`);
    return res.status(200).json({ success: true, message: "Verification email resent successfully." });

  } catch (error) {
    console.log("\n================ [ RESEND EMAIL FAILED ] ================");
    console.error("Reason Google Rejected It:", error.message);
    console.log("=========================================================\n");

    return res.status(500).json({ 
      success: false, 
      message: `Email Dispatch Failed: ${error.message || "Unknown SMTP error"}` 
    });
  }
};

// @desc    Check user verification status
// @route   GET /api/auth/check-status/:email
const checkStatus = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({ success: true, isVerified: user.isEmailVerified });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete all users (Testing utility)
// @route   DELETE /api/auth/delete-all
const deleteAllUsers = async (req, res) => {
  try {
    const result = await User.deleteMany({});
    res.status(200).json({ message: `Successfully deleted ${result.deletedCount} users.` });
  } catch (error) {
    console.error("Delete All Error:", error);
    res.status(500).json({ message: "Database deletion failed.", error: error.message });
  }
};

// @desc    Bulk Resend Verification Email
// @route   POST /api/auth/bulk-resend-verification
const bulkResendVerification = async (req, res) => {
  try {
    const { emails } = req.body;

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({ success: false, message: "No emails provided." });
    }

    let resentCount = 0;

    for (const email of emails) {
      const user = await User.findOne({ email }).select('+emailVerificationToken +emailVerificationExpires');
      if (!user || user.isEmailVerified) continue; // Skip if user doesn't exist or is already verified

      const verificationToken = generateCryptoToken();
      user.emailVerificationToken = verificationToken;
      user.emailVerificationExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
      await user.save();

      const currentClientUrl = req.headers.origin || process.env.CLIENT_URL || 'http://localhost:5173';
      const verifyUrl = `${currentClientUrl}/verify-email/${user.emailVerificationToken}`;
      const emailSubject = "Resend: Verify Your Account";
      const emailHtml = `
        <h2>Welcome to our platform, ${user.name}!</h2>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verifyUrl}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
        <p>This link will expire in 5 minutes.</p>
      `;

      await sendEmail(user.email, emailSubject, "Please verify your email", emailHtml);
      resentCount++;
    }

    res.status(200).json({ success: true, message: `Verification emails resent to ${resentCount} users successfully.` });
  } catch (error) {
    console.error("Bulk resend error:", error);
    res.status(500).json({ success: false, message: "Server error during email dispatch." });
  }
};

module.exports = { registerCustomer, bulkRegisterCustomers, loginUser, verifyUser, verifyEmail, applySeller, registerAdmin, approveSeller, deleteUser, deleteUserByEmail, getAllUsers, getUserProfile, checkStatus, deleteAllUsers, resendVerification, bulkResendVerification };