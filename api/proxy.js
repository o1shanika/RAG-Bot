export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const n8nWebhookUrl =
    process.env.N8N_WEBHOOK_URL ||
    'https://shanika2001.app.n8n.cloud/webhook/c28a212a-aadd-459d-9fa2-359b473ae457';

  try {
    const n8nRes = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const contentType = n8nRes.headers.get('content-type') || '';
    let data;

    if (contentType.includes('application/json')) {
      data = await n8nRes.json();
    } else {
      data = { reply: await n8nRes.text() };
    }

    res.status(n8nRes.status).json(data);
  } catch (err) {
    res.status(500).json({ error: `Proxy error: ${err.message}` });
  }
}
