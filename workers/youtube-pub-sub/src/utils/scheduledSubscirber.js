const subscribeToChannel = async (env) => {
  if (!env.YOUTUBE_CHANNEL_ID || !env.CALLBACK_URL || !env.LEASE_DAYS) {
    console.error('Missing required environment variables');
  }

  const topic = `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${env.YOUTUBE_CHANNEL_ID}`;
  
  // Prepare subscription request data
  const lease_seconds = `${60 * 60 * 24 * env.LEASE_DAYS}`;
  const formData = new FormData();
  formData.append('hub.callback', env.CALLBACK_URL);
  formData.append('hub.topic', topic);
  formData.append('hub.verify', 'async');
  formData.append('hub.mode', 'subscribe');
  formData.append('hub.lease_seconds', lease_seconds);

  // Send subscription request
  try {
    const response = await fetch(env.PUBSUBHUBBUB_HUB, {
      method: 'POST',
      body: formData
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to subscribe: ${response.status} ${errorText}`);
    }  
    console.log('Subscription successfully sent');
    return response;
  } catch (error) {
    console.error('Subscription error:', error);    
  }
}

export { subscribeToChannel };