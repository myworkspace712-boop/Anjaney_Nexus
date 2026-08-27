require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');


// Safe import for constants
let BRAND_NAME = 'Anjaney Nexus';
try {
  const constants = require('./constants');
  if (constants.BRAND_NAME) BRAND_NAME = constants.BRAND_NAME;
} catch (e) {
  console.warn('⚠️ constants.js not found, using default BRAND_NAME.');
}

const app = express();
const server = http.createServer(app);

// Connect DB
connectDB();

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

// CORS
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000', 
      'http://localhost:5173',
      'http://localhost:5174',
      process.env.FRONTEND_URL,
      'https://anjaney-nexus.onrender.com'
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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
app.post('/api/auth/verify', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ success: false, message: 'Token is required' });
    }

    const user = await User.findOne({ emailVerificationToken: token }).select('+emailVerificationToken +emailVerificationExpiry');
    
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid token (Direct Route)' });
    }

    res.json({ success: true, message: 'Direct Route works! Token found in DB.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Direct Route Error: ' + error.message });
  }
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
app.get('/api/health', (req, res) =>
  res.json({ success: true, message: `${BRAND_NAME} API running`, version: '2.0.0' })
);

// Global 404 Not Found Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl
  });
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
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 ${BRAND_NAME} Server running on port ${PORT} (0.0.0.0)`);
});