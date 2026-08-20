const mongoose = require('mongoose');
// Determine URIs from env or use defaults
const usersUri = process.env.MONGO_URI_USERS || 'mongodb://localhost:27017/Anjaney_Users_DB';
const adminsUri = process.env.MONGO_URI_ADMINS || 'mongodb://localhost:27017/Anjaney_Admins_DB';

// Create separate connections
const usersConnection = mongoose.createConnection(usersUri);

usersConnection.on('connected', () => {
  console.log(`✅ Users MongoDB Connected: ${usersConnection.host}`);
});
usersConnection.on('error', (err) => {
  console.error('❌ Users MongoDB connection error:', err);
});

const adminsConnection = mongoose.createConnection(adminsUri);

adminsConnection.on('connected', () => {
  console.log(`✅ Admins MongoDB Connected: ${adminsConnection.host}`);
});
adminsConnection.on('error', (err) => {
  console.error('❌ Admins MongoDB connection error:', err);
});

module.exports = {
  usersConnection,
  adminsConnection
};