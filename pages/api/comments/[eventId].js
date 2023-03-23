import { connectDatabase, insertDocument } from '../../../helpers/db-util';
import { MongoClient } from 'mongodb';
require('dotenv').config();

export default async function handler(req, res) {
  const { eventId } = req.query;
  try {
    const client = await connectDatabase();

    const db = client.db();

    if (req.method === 'POST') {
      // add server side validation
      const { email, name, text } = req.body;

      if (
        !email.includes('@') ||
        !name ||
        name.trim() === '' ||
        !text ||
        text.trim() === ''
      ) {
        res.status(422).json({ message: 'Invalid input.' });
        return;
      }

      const newComment = {
        email,
        name,
        text,
        eventId,
      };

      const result = await insertDocument(client, 'comments', newComment);

      newComment._id = result.insertedId;
      
      res.status(201).json({ message: 'Added comment.', comment: newComment });
    }

    if (req.method === 'GET') {
      const docs = await db
        .collection('comments')
        .find()
        .sort({ _id: -1 })
        .toArray();

      res.status(200).json({ comments: docs });
    }
  } catch (error) {
    res.status(500).json(`api/comments error db : $(err.message)`);
    return;
  }

  client.close();
}
