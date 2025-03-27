// YouTube PubSubHubbub Subscriber for Cloudflare Worker
// Subscribes to YouTube channel updates and triggers a deploy hook

// Required environment variables:
// - YOUTUBE_CHANNEL_ID: YouTube channel ID (e.g., "UCxxxxxxxxxxxxxxxx")
// - DEPLOY_HOOK_URL: URL to call after channel updates
// - CALLBACK_URL: Public URL of this worker

// Google PubSubHubbub Hub address
const PUBSUBHUBBUB_HUB = 'https://pubsubhubbub.appspot.com/subscribe';

// Function to subscribe to channel updates
const subscribeToChannel = async (env) => {
  if (!env.YOUTUBE_CHANNEL_ID || !env.CALLBACK_URL) {
    throw new Error('Missing required environment variables');
  }

  // Form the topic - URL of the channel's RSS feed
  const topic = `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${env.YOUTUBE_CHANNEL_ID}`;
  
  // Prepare subscription request data
  const lease_seconds = `${60 * 60 * 24 * 8}`;  // 8 days
  const formData = new FormData();
  formData.append('hub.callback', env.CALLBACK_URL);
  formData.append('hub.topic', topic);
  formData.append('hub.verify', 'async'); // or 'sync'
  formData.append('hub.mode', 'subscribe');
  formData.append('hub.lease_seconds', lease_seconds);

  // Send subscription request
  const response = await fetch(PUBSUBHUBBUB_HUB, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to subscribe: ${response.status} ${errorText}`);
  }

  console.log('Subscription successfully sent');
  return response;
}

const callDeployHook = async (request, env) => {
  if (!env || !env.DEPLOY_HOOK_URL) {
    return new Response('Missing DEPLOY_HOOK_URL environment variable', { status: 500 });
  }

  const url = new URL(request.url);
  const method = request.method;
  
  // Handle subscription verification (GET request from hub)
  if (method === 'GET' && url.pathname === '/') {
    const params = url.searchParams;
    const mode = params.get('hub.mode');
    const topic = params.get('hub.topic');
    const challenge = params.get('hub.challenge');
    const leaseSeconds = params.get('hub.lease_seconds');

    // Verify the topic is for our channel
    if (!topic || !topic.includes(env.YOUTUBE_CHANNEL_ID)) {
      console.error('Invalid topic received:', topic);
      return new Response('Invalid topic', { status: 400 });
    }

    // Confirm subscription or unsubscription
    if ((mode === 'subscribe' || mode === 'unsubscribe') && challenge) {
      console.log(`${mode} request for ${topic} received. Lease: ${leaseSeconds} seconds`);
      return new Response(challenge, {
        status: 200,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    return new Response('Bad Request', { status: 400 });
  }
  
  // Handle notifications (POST request from hub with updates)
  if (method === 'POST' && url.pathname === '/') {
    // Get update data
    const content = await request.text();
    console.log('Received update from YouTube:', content);

    // Call deploy hook
    try {
      const hookResponse = await fetch(env.DEPLOY_HOOK_URL, {
        method: 'POST'
      });
      
      if (!hookResponse.ok) {
        throw new Error(`Deploy hook returned status ${hookResponse.status}`);
      }
      
      console.log('Deploy hook called successfully');
      return new Response('OK', { status: 200 });
    } catch (error) {
      console.error('Error calling deploy hook:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }
  
  return new Response('Not Found', { status: 404 });
}

export default {
  async scheduled(controller, env) {
    try {
      await subscribeToChannel(env);
      return new Response('Subscription request sent', { status: 200 });
    } catch (error) {
      console.error('Subscription error:', error);
      return new Response(`Subscription error: ${error.message}`, { status: 500 });
    }
  },
  async fetch(request, env, ctx) {
    return await callDeployHook(request, env);
  }
};