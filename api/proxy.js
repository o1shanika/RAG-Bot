export default async function handler(req, res) {
  const n8nWebhookUrl =
    process.env.N8N_WEBHOOK_URL ||
    'https://shanika2001.app.n8n.cloud/webhook/shanika2001';

  const forwardHeaders = { 'Content-Type': 'application/json' };
  if (req.headers.authorization) {
    forwardHeaders['Authorization'] = req.headers.authorization;
  }

  try {
    const n8nRes = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: forwardHeaders,
      body: JSON.stringify(req.body),
    });

    let rawData = await n8nRes.text();
    console.log("Raw response from n8n:", rawData);

    let finalOutput = rawData;

    // Try to parse as JSON and extract `output` if available
    try {
      const parsed = JSON.parse(rawData);
      if (parsed && typeof parsed.output === 'string') {
        finalOutput = parsed.output;
      }
    } catch {
      // Not JSON, just keep raw text
    }

    res.setHeader('Content-Type', 'text/plain');
    res.status(n8nRes.status).send(finalOutput);
  } catch (err) {
    res.status(500).send(`Proxy error: ${err.message}`);
  }
}
