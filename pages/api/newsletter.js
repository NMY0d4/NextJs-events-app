import { connectDatabase, insertDocument } from '../../helpers/db-util';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;
    let client;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    try {
      client = await connectDatabase();
      await insertDocument(client, 'newsletter', { email: userEmail });
    } catch (err) {
      res.status(500).json(`api/newsletter error db : ${err.message}`);
    }

    client.close();
    res.status(201).json({ message: 'Signed up!' });
  }
}
