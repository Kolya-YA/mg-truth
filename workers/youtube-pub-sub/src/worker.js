import { HtmlError } from "./utils/Errors";
import { subscribeToChannel } from "./utils/scheduledSubscirber";
import { handleRequest } from "./utils/handleRequest";

export default {
  async scheduled(controller, env) {
    return await subscribeToChannel(env);
  },

  async fetch(request, env, ctx) {
    try {
      return await handleRequest(request, env, ctx);
    } catch (error) {

      if (error instanceof HtmlError) {
        return new Response(error.message, { status: error.status });
      }

      return new Response('Internal Server Error', { status: 500 });
    }
  }
};