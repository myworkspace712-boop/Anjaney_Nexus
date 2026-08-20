const jwt = require('jsonwebtoken');
const User = require('../models/User');


const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token && req.cookies?.an_token) {
      token = req.cookies.an_token;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');

    // Single unified lookup
    const account = await User.findById(decoded.id).select('-password');

    if (!account) {
      return res.status(401).json({ success: false, message: 'Account not found' });
    }

    if (account.isActive === false) {
      return res.status(403).json({ success: false, message: 'Account is deactivated' });
    }

    req.user = account;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token invalid or expired' });
  }
};

const admin = (req, res, next) => {
  if (req.user && ['admin', 'superadmin'].includes(req.user.role)) {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Access denied: Admin only' });
};

const seller = (req, res, next) => {
  if (req.user && ['seller', 'admin', 'superadmin'].includes(req.user.role)) {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Access denied: Seller only' });
};

module.exports = { protect, admin, seller };