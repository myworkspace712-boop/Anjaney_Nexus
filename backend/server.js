process.on('uncaughtException', (err) => {
  console.log("\n================ [ REAL FATAL CRASH ] ================");
  console.error("The server genuinely crashed due to this exact error:");
  console.error(err.stack || err.message);
  console.log("======================================================\n");
  process.exit(1);
});

const path = require('path');
const fs = require('fs');

const envPath = path.resolve(__dirname, '.env');

console.log("\n================ [ SYSTEM BOOT CHECK ] ================");

if (!fs.existsSync(envPath)) {
  console.log("⚠️ .env file MISSING. Auto-generating a template now...");
  const defaultEnvContent = `SMTP_EMAIL=your_email@gmail.com\nSMTP_PASS=your_16_letter_app_password\nPORT=5000\n`;
  fs.writeFileSync(envPath, defaultEnvContent);
  console.log("⚠️ ACTION REQUIRED: I created a .env file. Please fill in your passwords.");
} else {
  console.log("✅ .env file physically found on hard drive.");
}

require('dotenv').config({ path: envPath });

const dns = require('dns');
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASS || process.env.SMTP_EMAIL === 'your_email@gmail.com') {
  console.error("⚠️ SAFE MODE ACTIVE: SMTP_EMAIL or SMTP_PASS missing or invalid in .env.");
  console.error("⚠️ The server is running, but email verification will fail.");
} else {
  console.log("✅ Environment variables loaded into memory successfully.");
}
console.log("=======================================================\n");

const express = require('express');
const os = require('os');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const connectDB = require('./config/db');



process.on('unhandledRejection', (reason, promise) => {
  console.error('\n=================================');
  console.error('[FATAL CRASH] Unhandled Promise Rejection:');
  console.error(reason);
  console.error('=================================\n');
});

const localIpAddress = process.env.LOCAL_IP || '192.168.1.15';


// Safe import for constants
let BRAND_NAME = 'Anjaney Nexus';
try {
  const constants = require('./constants');
  if (constants.BRAND_NAME) BRAND_NAME = constants.BRAND_NAME;
} catch (e) {
  console.warn('⚠️ constants.js not found, using default BRAND_NAME.');
}

const app = express();

// MUST BE AT THE VERY TOP
app.use(cors({
  origin: '*', // Allow all local network IPs to connect
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: '*'
}));
app.options(/.*/, cors()); // Explicitly answer all OPTIONS preflight requests
const server = http.createServer(app);

// Connect DB
connectDB();

// ─── SMTP Startup Verification ───
/*
const smtpTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

smtpTransporter.verify((error, success) => {
  if (error) {
    // console.error("🚨 FATAL SMTP ERROR:", error);
    // process.exit(1); // Demoted to warning so server doesn't crash on boot
  } else {
    console.log("✅ SMTP Email Server Connected & Ready");
  }
});
*/

// Setup Socket.io safely
try {
  const setupSocket = require('./socket');
  const notificationService = require('./services/notificationService');
  const io = setupSocket(server);
  notificationService.setIO(io);
} catch (e) {
  console.warn('⚠️ Socket.io or Notification service failed to load:', e.message);
}

// Security & Cookies
app.use(helmet());
app.use(cookieParser());



// Rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: { success: false, message: 'Too many requests, try again later' }
});
app.use('/api', generalLimiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// NEW: Global Request Logger
app.use((req, res, next) => {
  console.log(`[INCOMING REQUEST] Method: ${req.method} | URL: ${req.url} | Original URL: ${req.originalUrl}`);
  next();
});

// ─── Safe Route Loader ───
// Helper function to mount routes without crashing the entire server if one file is missing
const mountRoute = (path, modulePath) => {
  try {
    app.use(path, require(modulePath));
  } catch (err) {
    console.error(`❌ Failed to load route ${path} (${modulePath}):`);
    console.error(err.stack); // Changed to err.stack to expose hidden errors
  }
};

const User = require('./models/User');


// 1. Diagnostic test route
app.post('/api/auth/ping', (req, res) => {
  res.status(200).json({ message: "Server is alive and receiving POST requests!" });
});

mountRoute('/api/auth', './routes/auth');
mountRoute('/api/users', './routes/userRoutes');
mountRoute('/api/admin_auth', './routes/adminRoutes');
mountRoute('/api/seller_auth', './routes/sellerRoutes');
mountRoute('/api/products', './routes/products');
mountRoute('/api/orders', './routes/orders');
mountRoute('/api/admin', './routes/admin');
mountRoute('/api/categories', './routes/categories');
mountRoute('/api/reviews', './routes/reviews');
mountRoute('/api/wishlist', './routes/wishlist');
mountRoute('/api/wallet', './routes/wallet');
mountRoute('/api/coupons', './routes/coupons');
mountRoute('/api/payments', './routes/payments');
mountRoute('/api/ai', './routes/ai');
mountRoute('/api/analytics', './routes/analytics');
mountRoute('/api/blog', './routes/blog');
mountRoute('/api/seller-profile', './routes/sellerProfile');
mountRoute('/api/referral', './routes/referral');
mountRoute('/api/logistics', './routes/logistics');
mountRoute('/api/notifications', './routes/notifications');

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).send("✅ Backend is reachable over the network!");
});

// 1. Import the controller directly
const { registerCustomer } = require('./controllers/authController');

// 2. Add a startup health-check to ensure it's not undefined
console.log("[STARTUP CHECK] Is registerCustomer defined?", typeof registerCustomer !== 'undefined');

// 3. Mount the route directly on the app instance (Bypassing authRoutes.js)
app.post('/api/auth/register', registerCustomer);

// 4. THIS MUST BE LAST: Update the 404 handler to log the exact method
app.use((req, res, next) => {
  console.log(`[404 HIT] Method: ${req.method} | URL: ${req.originalUrl}`);
  res.status(404).json({ message: `Backend route not found: [${req.method}] ${req.originalUrl}` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Global Error]:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
  });
});

const PORT = process.env.PORT || 5000;

// STRICT IPv4 BINDING
server.listen(PORT, '127.0.0.1', () => {
  console.clear();
  console.log(`🚀 BACKEND ONLINE: http://127.0.0.1:${PORT}`);
});