import { HtmlError } from "./Errors";
import { handleSubVerification } from "./handleSubVerification";
import { handleSubNotification } from "./handleSubNotification";

const handleRequest = async (request, env, ctx) => {  
  const url = new URL(request.url);
  const method = request.method;
  
  if (url.pathname === '/') {
    // Handle subscription verification
    if (method === 'GET') {
      return handleSubVerification(url.searchParams, env.YOUTUBE_CHANNEL_ID);
    }

    // Handle notifications (POST request from hub with updates)
    if (method === 'POST') {
      return await handleSubNotification(request, env, ctx);        
    }
  }
  
  throw new HtmlError('Not Found', 404);
}

export { handleRequest };