export default async function handler(req, res) {
  try {
    const response = await fetch(
      'https://shanika2001.app.n8n.cloud/webhook/98d25a9d-5763-4419-91bd-ee1d2675c924',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
