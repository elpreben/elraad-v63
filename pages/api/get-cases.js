import { redis } from '../../utils/upstashClient';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const cases = await redis.lrange('cases', 0, -1);
    const parsedCases = cases.map((c) => JSON.parse(c));
    return res.status(200).json({ cases: parsedCases });
  } catch (error) {
    return res.status(500).json({ error: 'Kunne ikke hente saker' });
  }
}