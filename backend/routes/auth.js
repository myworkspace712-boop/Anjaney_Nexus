const router = require('express').Router();
const crypto = require('crypto');
const User = require('../models/User');
const generateToken = require('../utils/token');
const { protect, admin } = require('../middleware/auth');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../utils/emailService');
const { sendEmail } = require('../utils/sendEmail');
const { registerCustomer, bulkRegisterCustomers, loginUser, verifyEmail, deleteUser, deleteUserByEmail, getAllUsers, getUserProfile, checkStatus, deleteAllUsers, resendVerification, bulkResendVerification } = require('../controllers/authController');

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

// ─────────────────────────────────────────────────────────────
// @DELETE /api/auth/delete-all — delete all users (testing)
// ─────────────────────────────────────────────────────────────
router.delete('/delete-all', deleteAllUsers);

// ─────────────────────────────────────────────────────────────
// @GET /api/auth/users — get all users
// ─────────────────────────────────────────────────────────────
router.get('/users', protect, admin, getAllUsers);

// ─────────────────────────────────────────────────────────────
// @POST /api/auth/verify-email/:token
// ─────────────────────────────────────────────────────────────
router.post('/verify-email/:token', verifyEmail);

// ─────────────────────────────────────────────────────────────
// @GET /api/auth/check-status/:email
// ─────────────────────────────────────────────────────────────
router.get('/check-status/:email', checkStatus);

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

// ─────────────────────────────────────────────────────────────
// @POST /api/auth/login
// ─────────────────────────────────────────────────────────────
router.post('/login', loginUser);

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