import { HtmlError } from "./Errors";

const handleSubVerification = (params, youtubeChannelId) => {
      const mode = params.get('hub.mode');
      const topic = params.get('hub.topic');
      const challenge = params.get('hub.challenge');
      const leaseSeconds = params.get('hub.lease_seconds');
  
      // Verify the request is for our channel
      if (!challenge || !topic || !topic.includes(youtubeChannelId)) {
        console.error('No challenge or invalid topic received:', topic);
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

export { handleSubVerification };