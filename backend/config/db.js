const mongoose = require('mongoose');


// Attach listeners once outside the function to avoid duplicate loggers
mongoose.connection.on('connected', () => {
  console.log(`✅ MongoDB Connected to: ${mongoose.connection.host} | DB: ${mongoose.connection.name}`);
});

mongoose.connection.on('error', (err) => {
  console.error(`❌ MongoDB Runtime Error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB Disconnected');
});

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error('❌ MONGO_URI is not defined in environment variables');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 10,
      family: 4,
      authSource: 'admin',
      bufferCommands: false,
    });
    console.log(`✅ MongoDB Connection Established: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Initial DB Connection Error: ${error.message}`);
    console.error('If you see "bad auth", your Atlas username/password is incorrect.');
  }
};


module.exports = connectDB;