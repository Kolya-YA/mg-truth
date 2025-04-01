import { HtmlError } from "./Errors";

const handleRequest = async (request, env) => {
  
  const url = new URL(request.url);
  const method = request.method;
  
  if (url.pathname === '/') {
    // Handle subscription verification (GET request from hub)
    if (method === 'GET') {
      const params = url.searchParams;
      const mode = params.get('hub.mode');
      const topic = params.get('hub.topic');
      const challenge = params.get('hub.challenge');
      const leaseSeconds = params.get('hub.lease_seconds');
  
      // Verify the topic is for our channel
      if (!topic || !topic.includes(env.YOUTUBE_CHANNEL_ID)) {
        console.error('Invalid topic received:', topic);
        throw new HtmlError('Invalid topic', 400);
      }
  
      // Confirm subscription or unsubscription
      if ((mode === 'subscribe' || mode === 'unsubscribe') && challenge) {
        console.log(`${mode} request for ${topic} received. Lease: ${leaseSeconds} seconds`);
        return new Response(challenge, {
          status: 200,
          headers: { 'Content-Type': 'text/plain' }
        });
      }
  
      throw new HtmlError('Invalid subscription request', 400);
    }

    // Handle notifications (POST request from hub with updates)
    if (method === 'POST') {
      const xmlData = await request.text();
      if (!xmlData) {
        console.error('No XML data received');
        throw new HtmlError('No XML data received', 400);
      }

      return xmlData
    }
  }
  
  throw new HtmlError('Not Found', 404);
}

export { handleRequest };