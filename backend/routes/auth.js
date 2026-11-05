const router = require('express').Router();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/token');
const { protect, admin } = require('../middleware/auth');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../utils/emailService');
const { sendEmail } = require('../utils/sendEmail');
const { registerCustomer, bulkRegisterCustomers, loginUser, verifyEmail, verifyEmailOtp, deleteUser, deleteUserByEmail, getAllUsers, getUserProfile, checkStatus, deleteAllUsers, resendVerification, bulkResendVerification, checkVerificationStatus } = require('../controllers/authController');

// Diagnostic log
console.log("[ROUTER INIT] authRoutes.js is mounting endpoints.");

// ─── Helper: generate random hex token ───
const generateCryptoToken = () => crypto.randomBytes(32).toString('hex');

// ─────────────────────────────────────────────────────────────
// @POST /api/auth/register — with email verification
// ─────────────────────────────────────────────────────────────
router.post('/register', registerCustomer);



// ─────────────────────────────────────────────────────────────
// @POST /api/auth/bulk-register-customers — Bulk add users
// ─────────────────────────────────────────────────────────────
router.post('/bulk-register-customers', bulkRegisterCustomers);

// ─────────────────────────────────────────────────────────────
// @DELETE /api/auth/user/:id — delete user
// ─────────────────────────────────────────────────────────────
router.delete('/user/:id', protect, admin, deleteUser);

// ─────────────────────────────────────────────────────────────
// @DELETE /api/auth/delete-by-email — delete user by email
// ─────────────────────────────────────────────────────────────
router.delete('/delete-by-email', deleteUserByEmail);
router.delete('/delete', deleteUserByEmail);

// ─────────────────────────────────────────────────────────────
// @DELETE /api/auth/delete-all — delete all users (testing)
// ─────────────────────────────────────────────────────────────
router.delete('/delete-all', deleteAllUsers);

// ─────────────────────────────────────────────────────────────
// @GET /api/auth/users — get all users
// ─────────────────────────────────────────────────────────────
router.get('/users', protect, admin, getAllUsers);

// ─────────────────────────────────────────────────────────────
// @POST & @GET /api/auth/verify-email — verify user email directly
// ─────────────────────────────────────────────────────────────
router.all('/verify-email', async (req, res) => {
  try {
    const email = req.body?.email || req.query?.email;

    if (!email) {
      return res.status(400).json({ error: 'No email provided.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    let user = null;

    const mongoose = require('mongoose');
    if (mongoose.connection.readyState === 1) {
      try {
        user = await User.findOne({ email: cleanEmail }).setOptions({ bufferCommands: false }).maxTimeMS(2500);
        if (user) {
          user.isEmailVerified = true;
          user.emailVerificationToken = undefined;
          user.verificationToken = undefined;
          await user.save({ validateModifiedOnly: true });
          user.password = undefined;
        }
      } catch (err) {
        console.warn("⚠️ Could not update user in MongoDB during verification:", err.message);
      }
    }

    if (!user) {
      user = {
        name: cleanEmail.split('@')[0],
        email: cleanEmail,
        isEmailVerified: true,
        role: 'user'
      };
    }

    res.status(200).json({ 
      success: true,
      message: 'Email verified successfully!',
      user: user
    });
  } catch (error) {
    console.error('Verification Error:', error);
    res.status(500).json({ error: 'Internal server error during verification.' });
  }
});

router.post('/verify-email/:token', verifyEmail);

// ─────────────────────────────────────────────────────────────
// @POST /api/auth/verify-code — 6-digit code verification
// ─────────────────────────────────────────────────────────────
router.post('/verify-code', verifyEmailOtp);

// ─────────────────────────────────────────────────────────────
// @GET /api/auth/check-status/:email
// ─────────────────────────────────────────────────────────────
router.get('/check-status/:email', checkStatus);

// ─────────────────────────────────────────────────────────────
// @GET /api/auth/status/:userId
// ─────────────────────────────────────────────────────────────
router.get('/status/:userId', checkVerificationStatus);

// ─────────────────────────────────────────────────────────────
// @POST /api/auth/resend-verification
// ─────────────────────────────────────────────────────────────
router.post('/resend-verification', resendVerification);

// ─────────────────────────────────────────────────────────────
// @POST /api/auth/bulk-resend-verification
// ─────────────────────────────────────────────────────────────
router.post('/bulk-resend-verification', bulkResendVerification);

// ─────────────────────────────────────────────────────────────
// @POST /api/auth/forgot-password
// ─────────────────────────────────────────────────────────────
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

    const user = await User.findOne({ email }).select('+resetPasswordToken +resetPasswordExpiry');
    if (!user) {
      // Don't reveal whether user exists or not (security)
      return res.json({ success: true, message: 'If an account exists with that email, a reset link has been sent.' });
    }

    const resetToken = generateCryptoToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    await sendPasswordResetEmail(user.email, resetToken);

    res.json({ success: true, message: 'If an account exists with that email, a reset link has been sent.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─────────────────────────────────────────────────────────────
// @POST /api/auth/reset-password/:token
// ─────────────────────────────────────────────────────────────
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpiry: { $gt: new Date() },
    }).select('+resetPasswordToken +resetPasswordExpiry +password');

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset link' });
    }

    user.password = password;  // Will be hashed by pre-save hook
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    res.json({ success: true, message: 'Password reset successful! You can now log in with your new password.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Define authorized master admins securely on the backend
const MASTER_ADMIN_EMAILS = ['yatharthjoshi127@gmail.com', 'yj7gov@gmail.com'];

// ─────────────────────────────────────────────────────────────
// @POST /api/auth/login
// ─────────────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // 1. Normalize email to match registration (case-insensitive, trimmed)
    const normalizedEmail = email.toLowerCase().trim();

    // 2. Fetch user and explicitly select the password field in case the schema hides it
    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    // 3. Safe Rejection: Do not reveal if the email exists or not
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // 4. Secure Hash Comparison
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // 5. Check Verification Status
    if (!user.isEmailVerified) {
      return res.status(403).json({ error: 'Please verify your email before signing in.' });
    }

    // --- Auto-promote authorized master emails if their DB record is stale ---
    if (MASTER_ADMIN_EMAILS.includes(normalizedEmail) && user.role !== 'admin') {
      user.role = 'admin';
      user.companyName = 'Anjaney Nexus Admin';
      await user.save(); // Permanently update the record in MongoDB
    }

    // 6. Success: Remove password from the object before sending to frontend
    user.password = undefined;

    res.status(200).json({ 
      message: 'Login successful', 
      user: user 
    });

  } catch (error) {
    console.error('Login Route Error:', error);
    res.status(500).json({ error: 'Internal server error during authentication.' });
  }
});

// ─────────────────────────────────────────────────────────────
// @GET /api/auth/me
// ─────────────────────────────────────────────────────────────
router.get('/me', protect, getUserProfile);

// ─────────────────────────────────────────────────────────────
// @PUT /api/auth/profile — update user profile
// ─────────────────────────────────────────────────────────────
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('+password');

    // Update name
    if (req.body.name) user.name = req.body.name;

    // Update phone
    if (req.body.phone !== undefined) user.phone = req.body.phone;

    // Update address
    if (req.body.address) {
      user.address = {
        street: req.body.address.street || user.address?.street || '',
        city: req.body.address.city || user.address?.city || '',
        state: req.body.address.state || user.address?.state || '',
        pincode: req.body.address.pincode || user.address?.pincode || '',
      };
    }

    // Change password (requires current password)
    if (req.body.newPassword) {
      if (!req.body.currentPassword) {
        return res.status(400).json({ success: false, message: 'Current password is required to change password' });
      }
      const isMatch = await user.matchPassword(req.body.currentPassword);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Current password is incorrect' });
      }
      if (req.body.newPassword.length < 6) {
        return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
      }
      user.password = req.body.newPassword;
    }

    // Seller info
    if (req.body.sellerInfo) {
      user.sellerInfo = req.body.sellerInfo;
    }

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        sellerInfo: user.sellerInfo,
      }
    });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;