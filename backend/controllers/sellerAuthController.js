const User = require('../models/User');


exports.registerSeller = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    // Password hashing is handled by the pre('save') hook in the User model
    const newSeller = new User({
      name,
      email,
      password,
      role: 'seller',
      sellerStatus: 'pending' // As per User model schema
    });

    await newSeller.save();

    return res.status(201).json({
      success: true,
      message: 'Seller registered successfully',
      seller: {
        id: newSeller._id,
        name: newSeller.name,
        email: newSeller.email
      }
    });

  } catch (error) {
    console.error('❌ Fatal Error in registerSeller:', error.message);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal Server Error during registration',
      error: error.message
    });
  }
};
