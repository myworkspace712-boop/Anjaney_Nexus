const mongoose = require('mongoose');
const dns = require('dns');

// On Windows, force IPv4 first to avoid SRV lookup timeouts with MongoDB Atlas
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

// Disable Mongoose command buffering so queries fail fast and never hang for 10000ms when offline
mongoose.set('bufferCommands', false);

// Attach connection event listeners
mongoose.connection.on('connected', () => {
  console.log(`✅ MongoDB Connected to: ${mongoose.connection.host} | DB: ${mongoose.connection.name}`);
});

mongoose.connection.on('error', (err) => {
  console.error(`❌ MongoDB Connection Error: ${err.message}`);
});

let isConnecting = false;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  if (isConnecting) return;

  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('❌ MONGO_URI is not defined in environment variables');
    return;
  }

  isConnecting = true;
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      family: 4,
    });
    isConnecting = false;
    return conn;
  } catch (error) {
    // Check if local MongoDB is available as a fallback
    try {
      console.log('🔄 Atlas connection failed. Trying local MongoDB (mongodb://127.0.0.1:27017/Anjaney_Nexus)...');
      const localConn = await mongoose.connect('mongodb://127.0.0.1:27017/Anjaney_Nexus', {
        serverSelectionTimeoutMS: 2000,
        family: 4,
      });
      console.log('✅ Connected to local MongoDB fallback.');
      isConnecting = false;
      return localConn;
    } catch {
      // Local not running either
    }

    isConnecting = false;
    console.error(`❌ DB Connection Failed: ${error.message}`);
    console.error('⚠️ [ACTION REQUIRED IN MONGODB ATLAS]:');
    console.error('   1. Log into your MongoDB Atlas dashboard (cloud.mongodb.com).');
    console.error('   2. Go to "Security" -> "Network Access" in the left sidebar.');
    console.error('   3. Click "Add IP Address" and select "Allow Access From Anywhere" (0.0.0.0/0).');
    console.error('   4. Confirm and wait 1 minute for Atlas to apply.');
    throw error;
  }
};

module.exports = connectDB;
