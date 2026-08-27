const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['customer', 'seller', 'admin'],
    default: 'customer'
  },
  sellerStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected']
  },
  isActive: {
    type: Boolean,
    default: true
  },

  // ─── Email Verification ───
  isEmailVerified: {
    type: Boolean,
    default: true  // true by default so existing/seeded users work
  },
  emailVerificationToken: { type: String, select: false },
  emailVerificationExpiry: { type: Date, select: false },

  // ─── Password Reset ───
  resetPasswordToken: { type: String, select: false },
  resetPasswordExpiry: { type: Date, select: false },

  // ─── Profile Fields ───
  phone: { type: String, trim: true, default: '' },
  avatar: { type: String, default: '' },
  address: {
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    pincode: { type: String, default: '' }
  },

  // ─── Seller Info ───
  sellerInfo: {
    shopName: String,
    location: String,
    bio: String,
    verified: { type: Boolean, default: false }
  },

  // ─── Wallet ───
  walletBalance: { type: Number, default: 0, min: 0 },

  // ─── Referral System ───
  referralCode: { type: String, unique: true, sparse: true },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  referralCount: { type: Number, default: 0 },

  // ─── Preferences ───
  recentSearches: [{ type: String }],
  recentlyViewed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
}, { timestamps: true, collection: 'users', strict: false });

// Generate unique referral code and hash password before save
userSchema.pre('save', async function() {
  // Generate referral code
  if (!this.referralCode && this.name) {
    this.referralCode = this.name.substring(0, 3).toUpperCase() + crypto.randomBytes(3).toString('hex').toUpperCase();
  }

  // Required for automatic hashing (Do NOT use arrow function here)
  if (!this.isModified('password')) {
    return;
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);