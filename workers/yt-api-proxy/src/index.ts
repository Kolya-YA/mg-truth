import { handleError } from './error';
import { Env, YoutubeResponse } from './types';
import { createJsonResponse } from './utils';
import { fetchChannelInfo, fetchLatestVideos } from './youtube-service';


export default {
	async fetch(req: Request, env: Env): Promise<Response> {
		try {
			const url = new URL(req.url);
			const maxResults = parseInt(url.searchParams.get('maxResults') || '10', 10);
			const [channel, videos] = await Promise.all([
				fetchChannelInfo(env.YOUTUBE_CHANNEL_ID, env.YOUTUBE_API_KEY),
				fetchLatestVideos(env.YOUTUBE_CHANNEL_ID, env.YOUTUBE_API_KEY, maxResults),
			]);

			const response: YoutubeResponse = {
				channel,
				videos,
			};

			return createJsonResponse(response);
		} catch (error) {
			return handleError(error);
		}
	}
}