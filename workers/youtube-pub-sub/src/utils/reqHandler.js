const callDeployHook = async (request, env) => {
  if (!env?.DEPLOY_HOOK_URL) {
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

export { callDeployHook };