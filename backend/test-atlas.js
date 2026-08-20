const { MongoClient } = require('mongodb');
require('dotenv').config();


async function testAtlas() {
  const client = new MongoClient(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
  try {
    await client.connect();
    const db = client.db('Plant_Base'); // Verify against your specific database
    const result = await db.collection('users').insertOne({ test: true, date: new Date() });
    const read = await db.collection('users').findOne({ _id: result.insertedId });
    console.log('✅ SUCCESS: Connected, inserted, and read document:', read);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
  } finally {
    await client.close();
  }
}
testAtlas();
