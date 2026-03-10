// Cloudflare Worker — receives chatbot leads and sends email via Gmail SMTP
// Deploy: Cloudflare Dashboard → Workers & Pages → Create Worker

export default {
  async fetch(request, env) {
    // CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': 'https://onpointfl.com',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const { email, phone, conversation } = await request.json();
      
      // Use MailChannels (free for Cloudflare Workers, no auth needed)
      const mailRes = await fetch('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: 'snipdish@gmail.com', name: 'On Point Team' }] }],
          from: { email: 'leads@onpointfl.com', name: 'On Point Chatbot' },
          subject: '🔥 New Chatbot Lead — On Point',
          content: [{
            type: 'text/plain',
            value: `New lead from chatbot!\n\n📧 Email: ${email || 'N/A'}\n📱 Phone: ${phone || 'N/A'}\n\n--- Conversation ---\n${conversation}`
          }]
        })
      });

      return new Response(JSON.stringify({ ok: true }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://onpointfl.com',
        }
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
  }
};
