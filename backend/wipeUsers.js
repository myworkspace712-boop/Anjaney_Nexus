require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

(async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env file");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    await User.deleteMany({});
    
    console.log("✅ Database Reset: All registered users have been successfully wiped.");
    process.exit(0);
  } catch (error) {
    console.error("🚨 Failed to wipe users:", error);
    process.exit(1);
  }
})();
