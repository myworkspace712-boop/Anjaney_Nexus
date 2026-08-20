const mongoose = require('mongoose');
const User = require('../models/User'); // Unified model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, adminSecret } = req.body || {};

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ success: false, message: 'Database unavailable' });
    }

    const expectedSecret = process.env.ADMIN_SECRET_KEY;
    if (!adminSecret || adminSecret !== expectedSecret) {
      return res.status(403).json({ success: false, message: 'Invalid admin secret key' });
    }

    const sanitizedEmail = email.toLowerCase().trim();

    // Query unified User collection
    const accountExists = await User.findOne({ email: sanitizedEmail });
    if (accountExists) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Create admin in the unified User collection
    const admin = await User.create({
      name,
      email: sanitizedEmail,
      password,
      role: 'admin' // This differentiates them from normal users
    });

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '30d' }
    );

    res.status(201).json({
      success: true,
      token,
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const verifyAdmin = async (req, res) => {
  try {
    const admin = await User.findById(req.user.id).select('-password');
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    res.json({ success: true, admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = { registerAdmin, verifyAdmin };