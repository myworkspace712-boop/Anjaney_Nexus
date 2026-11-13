const mongoose = require('mongoose');


require('dotenv').config();

async function testDirect() {
  // Use a base URI *without* credentials inside it (e.g., mongodb+srv://cluster0.abcde.mongodb.net/test)
  const baseUri = process.env.MONGO_BASE_URI || 'mongodb+srv://YOUR_CLUSTER.mongodb.net/Plant_Base';
  
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Anjaney_Nexus', {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ SUCCESS: Direct Auth connected! The failure was likely URI syntax/parsing.');
  } catch (error) {
    console.error('❌ ERROR: Direct Auth Failed. Verify your Atlas User permissions.', error.message);
  } finally {
    await mongoose.disconnect();
  }
}
testDirect();
