const mongoose = require('mongoose');


// Attach listeners once outside the function to avoid duplicate loggers
mongoose.connection.on('error', (err) => {
  console.error(`❌ MongoDB Runtime Error: ${err.message}`);
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
    console.log(`✅ MongoDB Connection Established: ${conn.connection.host} | Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ Initial DB Connection Error: ${error.message}`);
    console.error('If you see "bad auth", your Atlas username/password is incorrect.');
  }
};


module.exports = connectDB;


// Scenario 1: You have a custom company domain (e.g., @nexus.com)
// If you own a company domain, you hardcode the domain in the file (as shown in the previous prompt).

// How it works: You put const COMPANY_DOMAIN = '@nexus.com' in your code. You don't need to put your specific email prefix in the code. Whenever anyone signs up using an @nexus.com email, the system automatically makes them an admin.

// Why it's good: It scales perfectly as you hire new people.