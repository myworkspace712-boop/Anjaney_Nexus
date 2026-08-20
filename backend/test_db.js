require('dotenv').config();
const mongoose = require('mongoose');


async function test() {
  try {
    console.log('Testing connection to:', process.env.MONGO_URI?.replace(/:([^:@]{1,})@/, ':****@'));
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('✅ Connection SUCCESSFUL!');
    
    // Test direct write
    const testDoc = await mongoose.connection.collection('users').insertOne({
      name: 'Diagnostic Test User',
      email: `test_${Date.now()}@example.com`,
      role: 'customer',
      createdAt: new Date()
    });
    console.log('✅ Write SUCCESSFUL! Inserted ID:', testDoc.insertedId);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Connection or Write FAILED:', err.message);
    process.exit(1);
  }
}

test();