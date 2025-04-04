import { HtmlError } from './Errors';

import { sendTelegramMessage } from "./sendTelegramMessage";
import { callDeployHook } from "./callDeployHook";
import { parseNotification } from './parseNotification';

const handleSubNotification = async (request, env, ctx) => {
    const videoData = await parseNotification(request, env);

    if (videoData) {
        ctx.waitUntil(callAPIs(videoData, env));
        return new Response('Accepted', { status: 202 });  
    }

    throw new HtmlError('No valid/useful XML data received', 400);
}

export { handleSubNotification };

async function callAPIs(videoData, env) {
  try {
    const [tgMsgId] = await Promise.allSettled([
        sendTelegramMessage(videoData, env),
        callDeployHook(env),
    ])
      
    console.log('TG message ID:', tgMsgId);c      

    await env.MG_TG_MSG.put(videoData.videoId, '', {
        metadata: { meassage_id: tgMsgId, broadcastStatus: videoData.broadcastStatus },
        expirationTtl: 60 * 60 * 24 * 2 // 1 day
    });

    // const publishedMsg = await env.MG_TG_MSG.getWithMetadata(videoData.videoId)
    // console.log("Published message bStatus:", publishedMsg?.metadata?.broadcastStatus);
    
  } catch (error) {
    console.error('Error in fetch API:', error);
    return new Response('Error in fetch API', { status: 500 });
  }
}