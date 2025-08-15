export default async function handler(req, res) {
  // For security and flexibility, it's best to store this URL as an environment variable.
  const n8nWebhookUrl =
    process.env.N8N_WEBHOOK_URL ||
    'https://shanika2001.app.n8n.cloud/webhook/shanika2001';

  const forwardHeaders = { 'Content-Type': 'application/json' };
  // Forward the Authorization header from the client if it exists
  if (req.headers.authorization) {
    forwardHeaders['Authorization'] = req.headers.authorization;
  }

  try {
    const n8nRes = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: forwardHeaders,
      body: JSON.stringify(req.body),
    });

    // Read the response as text to handle any content type (JSON, text, HTML error)
    const data = await n8nRes.text();
    console.log("Raw response from n8n:", data);


    // Forward the original Content-Type header and status code from n8n
    res.setHeader('Content-Type', n8nRes.headers.get('content-type') || 'application/json');
    res.status(n8nRes.status).send(data);
  } catch (err) {
    res.status(500).json({ error: `Proxy error: ${err.message}` });
  }
}
