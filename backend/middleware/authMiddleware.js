const { protect } = require('./auth');


const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin. 403 Forbidden.' });
  }
};

module.exports = { protect, isAdmin };