require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');


const cleanup = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('❌ MONGO_URI is not defined in environment variables');
      process.exit(1);
    }
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB for cleanup');
    
    const result = await User.deleteMany({ isEmailVerified: false });
    
    console.log(`✅ Cleanup complete. Deleted ${result.deletedCount} unverified test user(s).`);
  } catch (error) {
    console.error('❌ Error during cleanup:', error.message);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

cleanup();
