const mongoose = require('mongoose');


// Direct hardcoded string with the clean test credentials:
const MONGO_URI = 'mongodb+srv://testuser:PlantTest2026@cluster0.wdqz7ua.mongodb.net/Anjaney_Nexus?authSource=admin&retryWrites=true&w=majority';

async function runTest() {
  console.log('⏳ Attempting direct connection to MongoDB Atlas...');
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 8000,
      family: 4
    });
    console.log(`✅ SUCCESS: Connected to ${conn.connection.host}`);
    console.log(`📁 Database Name: ${conn.connection.name}`);
    
    // Test collection write
    const testDoc = await conn.connection.db.collection('test_ping').insertOne({
      status: 'active',
      timestamp: new Date()
    });
    console.log('✅ WRITE SUCCESS: Inserted test document ID:', testDoc.insertedId);

    // Clean up
    await conn.connection.db.collection('test_ping').deleteOne({ _id: testDoc.insertedId });
    console.log('✅ CLEANUP SUCCESS: Test document deleted.');
    
    await mongoose.disconnect();
    console.log('🎉 Database is 100% operational.');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ TEST FAILED:');
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    process.exit(1);
  }
}

runTest();
