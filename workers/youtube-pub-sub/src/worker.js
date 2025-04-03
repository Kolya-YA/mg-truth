import { HtmlError } from "./utils/Errors";
import { subscribeToChannel } from "./utils/scheduledSubscirber";
import { handleRequest } from "./utils/handleRequest";
import { sendTelegramMessage } from "./utils/sendTelegramMessage";
import { callDeployHook } from "./utils/callDeployHook";

export default {
  async scheduled(controller, env) {
    return await subscribeToChannel(env);
  },

  async fetch(request, env, ctx) {
    try {
      const xmlData = await handleRequest(request, env);

      if (!(xmlData instanceof Response)) {
        ctx.waitUntil(callAPIs(xmlData, env));
        return new Response('Accepted', { status: 202 });
      } else {
        console.log("Retutning response from handleRequest", xmlData);
        return xmlData
      }
    } catch (error) {
      if (error instanceof HtmlError) {
        return new Response(error.message, { status: error.status });
      }
      // Handle other errors
      console.error('Error in fetch handler:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }
};

async function callAPIs(xmlData, env) {
  try {
    await Promise.allSettled([
      callDeployHook(env),
      sendTelegramMessage(xmlData, env)
    ])
    
  } catch (error) {
    console.error('Error in fetch API:', error);
    return new Response('Error in fetch API', { status: 500 });
  }
}