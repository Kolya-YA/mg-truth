import { subscribeToChannel } from "./utils/scheduledSubscirber";
import { callDeployHook } from "./utils/reqHandler";

export default {
  async scheduled(controller, env) {
    return await subscribeToChannel(env);
  },
  async fetch(request, env, ctx) {
    return await callDeployHook(request, env);
  }
};