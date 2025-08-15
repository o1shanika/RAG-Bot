export default async function handler(req, res) {
  try {
    const response = await fetch(
      'https://shanika2001.app.n8n.cloud/webhook/a656cdd0-a353-441b-9024-5ec364a63a71/chat',
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
