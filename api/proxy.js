export default async function handler(req, res) {
  try {
    console.log("Request body:", req.body);

    const response = await fetch(
      'https://shanika2001.app.n8n.cloud/webhook/c28a212a-aadd-459d-9fa2-359b473ae457',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: err.message });
  }
}

