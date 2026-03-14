const { MongoClient } = require("mongodb");
const uri = process.env.NEXT_PUBLIC_MONGO_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = client.db("Final_Project");

export async function getCollection(collectionName) {
  await client.connect();
  return db.collection(collectionName);
}
