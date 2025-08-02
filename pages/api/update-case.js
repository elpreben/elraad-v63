import { redis } from '../../utils/upstashClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id, status } = req.body;

  try {
    const cases = await redis.lrange('cases', 0, -1);
    let updated = false;
    const updatedCases = cases.map((c) => {
      const parsed = JSON.parse(c);
      if (parsed.id === id) {
        parsed.status = status;
        updated = true;
      }
      return JSON.stringify(parsed);
    });

    if (updated) {
      await redis.del('cases');
      await redis.rpush('cases', ...updatedCases);
      return res.status(200).json({ message: 'Status oppdatert' });
    } else {
      return res.status(404).json({ error: 'Sak ikke funnet' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Kunne ikke oppdatere sak' });
  }
}