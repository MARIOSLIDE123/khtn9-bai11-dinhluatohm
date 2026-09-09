// Vercel Serverless Function: Proxies requests to Google Apps Script
export default async function handler(req: any, res: any) {
  // Setup CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const scriptUrl =
    process.env.GOOGLE_SCRIPT_URL ||
    'https://script.google.com/macros/s/AKfycbxvk2AdfffHI2ZmU_e2jKCJgzSia3L6IEpdD1NnHqsQ0Jzy6X7T2wslMF0ggtsjRa7g/exec';
  const scriptToken = process.env.GOOGLE_SCRIPT_TOKEN;

  if (!scriptUrl) {
    return res.status(200).json({ status: 'ok', note: 'Google Script URL not configured.' });
  }

  // Handle GET: Fetch results for Teacher Dashboard
  if (req.method === 'GET') {
    try {
      const response = await fetch(scriptUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'Failed to fetch from Google Script' });
    }
  }

  // Handle POST: Submit/update student session
  if (req.method === 'POST') {
    try {
      const payload = {
        token: scriptToken,
        ...req.body,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      return res.status(200).json({ status: 'success', data });
    } catch (error: any) {
      return res.status(500).json({ error: error.message || 'Failed to sync with Google Script' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
