require('dotenv').config();
const mongoose = require('mongoose');


async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000, family: 4 });
    console.log('✅ DB Connected');
    await mongoose.connection.collection('test').insertOne({ message: 'Hello' });
    const doc = await mongoose.connection.collection('test').findOne({ message: 'Hello' });
    console.log('✅ Read/Write Success:', doc);
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}
testConnection();
