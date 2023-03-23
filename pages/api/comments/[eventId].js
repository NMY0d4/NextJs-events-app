import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from '../../../helpers/db-util';

export default async function handler(req, res) {
  let client;
  try {
    const { eventId } = req.query;
    client = await connectDatabase();

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
      const docs = await getAllDocuments(
        client,
        'comments',
        { _id: -1 },
        { eventId: eventId }
      );

      res.status(200).json({ comments: docs });
    }
  } catch (err) {
    res.status(500).json(`api/comments error db : ${err.message}`);
  }
  client.close();
}
