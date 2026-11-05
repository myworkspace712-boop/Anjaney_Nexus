const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

const sendVerification = async (user, fallbackEmail = null) => {
  // 1. Ensure the user object actually contains an email
  const targetEmail = user.email || fallbackEmail;
  if (!targetEmail) {
    console.error("\n🛑 ABORTING EMAIL: The user's email variable is undefined or missing!\n");
    const err = new Error("Registration failed: Email address is missing.");
    err.status = 400;
    throw err;
  }

  console.log(`\n=========================================`);
  console.log(`📧 Attempting to send verification code & link to: ${targetEmail}`);
  console.log(`=========================================\n`);

  const emailUser = process.env.EMAIL_USER || process.env.SMTP_EMAIL;
  const emailPass = (process.env.EMAIL_PASS || process.env.SMTP_PASS || process.env.SMTP_PASSWORD || '').replace(/\s+/g, '');

  if (!emailUser || !emailPass) {
    throw new Error("Missing email credentials (EMAIL_USER / EMAIL_PASS) in backend/.env file.");
  }

  // Generate 6-digit verification code if not already set
  const otpCode = user.emailVerificationOtp || Math.floor(100000 + Math.random() * 900000).toString();
  user.emailVerificationOtp = otpCode;

  // 1. USE THE 'gmail' SERVICE PRESET
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });

  const frontendUrl = process.env.FRONTEND_URL || process.env.CLIENT_URL || 'http://localhost:5173';
  const token = user.emailVerificationToken || '';
  const verifyUrl = `${frontendUrl}/verify-email?email=${encodeURIComponent(targetEmail)}${token ? `&token=${token}` : ''}`;

  // 3. Dynamic Dispatch with Verification Link
  console.log(`\n=========================================`);
  console.log(`📧 HANDING OFF VERIFICATION EMAIL TO GOOGLE...`);
  console.log(`Target Inbox: ${targetEmail}`);
  console.log(`Verification URL: ${verifyUrl}`);

  try {
    const info = await transporter.sendMail({
      from: `"Anjaney Nexus" <${process.env.SMTP_EMAIL}>`,
      to: targetEmail,
      subject: `Please verify your email address - Anjaney Nexus`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06);">
          <div style="background: #0f172a; padding: 28px 24px; text-align: center; border-bottom: 3px solid #ea580c;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 0.5px;">
              Anjaney Nexus <span style="color: #f97316;">India</span>
            </h1>
            <p style="color: #94a3b8; font-size: 13px; margin: 6px 0 0; text-transform: uppercase; letter-spacing: 1px;">Corporate Account Email Verification</p>
          </div>
          <div style="padding: 36px 32px;">
            <h2 style="color: #0f172a; margin-top: 0; font-size: 20px; font-weight: 700;">Verify Your Email Address</h2>
            <p style="color: #475569; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
              Thank you for registering with <strong>Anjaney Nexus</strong>. To activate your corporate account for <span style="color: #ea580c; font-weight: 600;">${targetEmail}</span> and complete your registration, please click the button below:
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${verifyUrl}" style="background-color: #ea580c; color: #ffffff; padding: 14px 36px; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 15px; display: inline-block; box-shadow: 0 4px 14px rgba(234,88,12,0.35);">
                Verify My Email
              </a>
            </div>
            <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin-top: 24px;">
              Or copy and paste this link directly into your browser:
            </p>
            <p style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; font-size: 12px; font-family: monospace; word-break: break-all; color: #334155;">
              ${verifyUrl}
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 20px;">
              This verification link will remain active for 24 hours.
            </p>
          </div>
          <div style="background: #f8fafc; padding: 20px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
              If you didn't create an account on Anjaney Nexus, you can safely ignore this email.
            </p>
          </div>
        </div>
      `
    });

    console.log(`✅ SUCCESS: Google formally accepted the email!`);
    console.log(`🧾 Google Receipt (Message ID): ${info.messageId}`);
    console.log(`=========================================\n`);

    return { messageId: info.messageId, verifyUrl };
  } catch (emailError) {
    console.error(`\n🛑 GOOGLE REJECTED THE DISPATCH!`);
    console.error(`Reason: ${emailError.message}`);
    console.log(`=========================================\n`);
    throw new Error(`Email Dispatch Failed: ${emailError.message}`);
  }
};

// 1. USE THE 'gmail' SERVICE PRESET
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || process.env.SMTP_EMAIL,
    pass: (process.env.EMAIL_PASS || process.env.SMTP_PASS || '').replace(/\s+/g, '')
  },
  tls: {
    // Forces Node to accept the connection during local development
    rejectUnauthorized: false
  }
});

// Verify configuration on server startup
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Server is ready to take our messages");
  }
});
// ─── Helper: generate random hex token ───
const generateCryptoToken = () => crypto.randomBytes(20).toString('hex'); // Updated to 20 bytes

// @desc    Register a Customer (and conditionally a Seller)
// @route   POST /api/auth/register
const registerCustomer = async (req, res) => {
  console.log("[CONTROLLER] Register function hit with body:", req.body);
  try {
    const { name, email, password, role, sellerInfo, companyName } = req.body || {};
    const normalizedEmail = email ? email.toLowerCase().trim() : '';
    const userName = (name || companyName || (normalizedEmail ? normalizedEmail.split('@')[0] : 'User')).trim();

    // 1. Block execution if email is missing from the frontend payload
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: "Email variable is undefined. Check frontend data payload." 
      });
    }

    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required' });
    }

    if (password.length < 6 || password.length > 100) {
      return res.status(400).json({ success: false, message: 'Password must be 6-100 characters' });
    }
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    // Check database connection - only query if state is fully connected (1)
    const isDbConnected = mongoose.connection.readyState === 1;
    if (!isDbConnected) {
      console.log(`ℹ️ MongoDB readyState is ${mongoose.connection.readyState} (offline/connecting). Bypassing DB buffering to dispatch verification email immediately.`);
    }

    const verificationToken = generateCryptoToken();
    const verificationOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const COMPANY_DOMAIN = "@anjaneynexus.com";
    const isUserAdmin = normalizedEmail.endsWith(COMPANY_DOMAIN) || role === 'admin';
    const assignedRole = isUserAdmin ? 'admin' : (role === 'seller' ? 'seller' : 'customer');

    let user = null;

    if (isDbConnected) {
      try {
        const queryWithTimeout = (promise, ms = 2500) => {
          let timer;
          return Promise.race([
            promise,
            new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('DB operation timeout')), ms); })
          ]).finally(() => clearTimeout(timer));
        };

        const userExists = await queryWithTimeout(
          User.findOne({ email: normalizedEmail }).setOptions({ bufferCommands: false }).maxTimeMS(2000)
        );
        
        if (userExists) {
          if (userExists.isEmailVerified) {
            return res.status(400).json({ success: false, message: 'User already exists and is verified. Please log in.' });
          } else {
            console.log("Overwriting unverified ghost user in MongoDB...");
            await queryWithTimeout(
              User.findOneAndDelete({ email: normalizedEmail }).setOptions({ bufferCommands: false }).maxTimeMS(2000)
            );
          }
        }

        console.log("REGISTRATION ATTEMPT:", normalizedEmail);
        console.log("MongoDB Collection being used (Register):", User.collection.collectionName);
        user = await queryWithTimeout(
          User.create({
            name: userName,
            companyName: companyName || '',
            email: normalizedEmail,
            password,
            role: assignedRole,
            sellerInfo: assignedRole === 'seller' ? sellerInfo : undefined,
            isEmailVerified: false,
            emailVerificationToken: verificationToken,
            emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
          })
        );
      } catch (dbErr) {
        console.warn("⚠️ MongoDB query or write failed/timed out, proceeding with in-memory user:", dbErr.message);
        user = null;
      }
    }

    // Resilient fallback: If MongoDB is offline, proceed with email dispatch so the user is NOT blocked!
    if (!user) {
      console.log("ℹ️ Database temporarily offline: Proceeding with verification email dispatch for:", normalizedEmail);
      user = {
        name: userName,
        companyName: companyName || '',
        email: normalizedEmail,
        role: assignedRole,
        isEmailVerified: false,
        emailVerificationToken: verificationToken,
      };
    }

    const activeSmtpUser = process.env.SMTP_EMAIL || process.env.EMAIL_USER;
    const activeSmtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.SMTP_PASSWORD;

    console.log("\n================ [ DISPATCH INITIATED ] ================");
    console.log(`Target Email: ${user.email}`);
    console.log(`Generated 6-Digit OTP: ${verificationOtp}`);
    console.log(`SMTP_EMAIL visible to controller: ${activeSmtpUser ? '✅ YES' : '❌ UNDEFINED'}`);
    console.log(`SMTP_PASS visible to controller: ${activeSmtpPass ? '✅ YES' : '❌ UNDEFINED'}`);
    console.log("========================================================\n");

    if (!activeSmtpUser || !activeSmtpPass) {
      console.warn("⚠️ DISPATCH WARNING: EMAIL_USER / SMTP_EMAIL or password missing in .env.");
    }

    // 2. Attempt email dispatch WITHOUT an inner try/catch
    const senderEmail = process.env.EMAIL_USER || process.env.SMTP_EMAIL;
    const info = await transporter.sendMail({
      from: senderEmail, // Keep it exactly as the environment variable to avoid Google rejections
      to: email, 
      subject: "Verify Your Account - Anjaney Nexus India",
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Welcome to Anjaney Nexus India LLP</h2>
          <p>Thank you for registering. Please verify your email address to activate your dashboard.</p>
          <a href="http://localhost:5173/verify-email?email=${email}" style="background-color: #f97316; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px; font-weight: bold;">
            Verify Email Address
          </a>
        </div>
      `
    });

    console.log("✅ SUCCESS! Email sent. Message ID:", info.messageId);

    // 3. ONLY return success to the frontend IF the email actually sent
    return res.status(201).json({ 
      success: true, 
      message: "User registered and verification email sent." 
    });

  } catch (error) {
    console.error("❌ CRITICAL ERROR:", error.message);
    
    // 4. Send the exact Node.js error back to the frontend
    return res.status(500).json({ 
      success: false, 
      message: "Backend failed to send the email.",
      errorDetails: error.message 
    });
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
    
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "Database service is temporarily unavailable. Please try again in a few moments."
      });
    }

    console.log("LOGIN SEARCH QUERY:", normalizedEmail);
    const user = await User.findOne({ email: normalizedEmail }).setOptions({ bufferCommands: false }).select('+password');
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

    // Auto-promote master admins if record is stale
    const MASTER_ADMIN_EMAILS = ['yatharthjoshi127@gmail.com', 'yj7gov@gmail.com'];
    if (MASTER_ADMIN_EMAILS.includes(normalizedEmail) && user.role !== 'admin') {
      user.role = 'admin';
      user.companyName = 'Anjaney Nexus Admin';
      await user.save();
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

// @desc    Verify Email via 6-Digit Code (POST)
// @route   POST /api/auth/verify-code
const verifyEmailOtp = async (req, res) => {
  try {
    const { email, code } = req.body || {};
    const normalizedEmail = email ? email.toLowerCase().trim() : '';
    const cleanCode = code ? String(code).trim() : '';

    if (!normalizedEmail || !cleanCode) {
      return res.status(400).json({ success: false, message: 'Email and 6-digit verification code are required.' });
    }

    let user = null;
    if (mongoose.connection.readyState === 1) {
      try {
        user = await User.findOne({ email: normalizedEmail }).setOptions({ bufferCommands: false }).select('+emailVerificationOtp +emailVerificationExpires +emailVerificationToken');
      } catch (e) {
        user = null;
      }
    }

    if (!user) {
      // If DB is offline or user was registered in-memory, accept valid 6-digit code format
      if (cleanCode.length === 6 && /^\d{6}$/.test(cleanCode)) {
        return res.status(200).json({
          success: true,
          message: 'Email verified successfully!',
          token: jwt.sign({ email: normalizedEmail, role: 'customer' }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' }),
          user: { name: normalizedEmail.split('@')[0], email: normalizedEmail, role: 'customer' }
        });
      }
      return res.status(404).json({ success: false, message: 'No registered user found with that email address.' });
    }

    if (user.isEmailVerified) {
      return res.status(200).json({
        success: true,
        message: 'Account already verified.',
        user: { id: user._id, name: user.name, email: user.email, role: user.role }
      });
    }

    if (user.emailVerificationExpires && user.emailVerificationExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: 'Verification code has expired. Please click Resend Code.'
      });
    }

    if (user.emailVerificationOtp !== cleanCode && user.emailVerificationToken !== cleanCode) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect 6-digit verification code. Please check your inbox and try again.'
      });
    }

    user.isEmailVerified = true;
    await user.save({ validateModifiedOnly: true });

    const authToken = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Email verified successfully!',
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

    let user = null;
    if (mongoose.connection.readyState === 1) {
      try {
        user = await User.findOne({ email }).setOptions({ bufferCommands: false }).select('+emailVerificationToken +emailVerificationExpires');
      } catch (err) {
        user = null;
      }
    }

    if (!user) {
      user = { email, isEmailVerified: false };
    }

    if (user.isEmailVerified) {
      console.log("3. Email already verified.");
      return res.status(400).json({ success: false, message: 'Email already verified' });
    }

    // Ensure variables exist before trying to connect
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASS) {
      console.error("\n🛑 RESEND FAILED: Missing .env credentials (SMTP_EMAIL / SMTP_PASS)\n");
      return res.status(500).json({ success: false, message: "Server configuration error: Missing email credentials." });
    }

    // Generate new token
    const verificationToken = generateCryptoToken();
    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();
    
    console.log("4. Verification token regenerated successfully.");

    try {
      await sendVerification(user); // Pass the newly registered user object
      console.log(`✅ Verification email dynamically sent to ${user.email}`);
    } catch (error) {
      console.error(`🛑 Failed to send email to ${user.email}. Reason:`, error.message);
      throw error;
    }

    console.log(`✅ Resend Successful! Email delivered to ${user.email}`);
    return res.status(200).json({ 
      success: true, 
      message: "Verification email resent successfully.",
      debugOtp: process.env.NODE_ENV !== 'production' ? verificationOtp : undefined
    });

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

const checkVerificationStatus = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1 || !req.params.userId || !mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(200).json({ isVerified: false });
    }
    const user = await User.findById(req.params.userId).setOptions({ bufferCommands: false }); 
    if (!user) {
      return res.status(200).json({ isVerified: false });
    }

    if (user.isEmailVerified) {
      // Generate token exactly as you do in your normal login route
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

      return res.status(200).json({ 
        isVerified: true, 
        token, 
        user: { _id: user._id, name: user.name, email: user.email, role: user.role } 
      });
    }

    return res.status(200).json({ isVerified: false });
  } catch (error) {
    return res.status(500).json({ message: "Server error checking status" });
  }
};

module.exports = { registerCustomer, bulkRegisterCustomers, loginUser, verifyUser, verifyEmail, verifyEmailOtp, applySeller, registerAdmin, approveSeller, deleteUser, deleteUserByEmail, getAllUsers, getUserProfile, checkStatus, deleteAllUsers, resendVerification, bulkResendVerification, checkVerificationStatus };