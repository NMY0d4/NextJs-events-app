import { MongoClient } from 'mongodb';
require('dotenv').config();

export async function connectDatabase() {
  return await MongoClient.connect(process.env.MONGO_DB_URL);
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  return await db.collection(collection).insertOne(document);
}

export async function getAllDocuments(client, collection, sort, filter) {
  const db = client.db();
  return await db.collection(collection).find(filter).sort(sort).toArray();
}
