import { ApiError } from "./error";
import { ChannelData, VideoData, YouTubeChannelsResponse, YouTubeSearchResponse } from "./types";
import { typedFetch } from "./utils";

const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3";

export async function fetchChannelInfo(channelId: string, apiKey: string): Promise<ChannelData> {
	const params = new URLSearchParams({
		part: 'snippet,statistics',
		id: channelId,
		key: apiKey
	});

	const data = await typedFetch<YouTubeChannelsResponse>(`${YOUTUBE_API_BASE_URL}/channels?${params}`);

	if (!data.items || data.items.length === 0) {
		throw new ApiError('Channel not found', 404);
	}

	const channel = data.items[0];

	return {
		id: channel.id,
		title: channel.snippet.title,
		description: channel.snippet.description,
		thumbnails: channel.snippet.thumbnails,
		statistics: channel.statistics,
		customUrl: channel.snippet.customUrl,
		country: channel.snippet.country
	};
}

export async function fetchLatestVideos(channelId: string, apiKey: string, maxResults: number = 10): Promise<VideoData[]> {
	const params = new URLSearchParams({
		part: 'snippet',
		channelId,
		maxResults: maxResults.toString(),
		order: 'date',
		type: 'video',
		key: apiKey
	});

	const data = await typedFetch<YouTubeSearchResponse>(`${YOUTUBE_API_BASE_URL}/search?${params}`);

	if (!data.items || data.items.length === 0) {
		return [];
	}

	return data.items.map(item => ({
		id: item.id.videoId,
		title: item.snippet.title,
		description: item.snippet.description,
		publishedAt: item.snippet.publishedAt,
		liveBroadcastContent: item.snippet.liveBroadcastContent,
		thumbnails: item.snippet.thumbnails,
	}));


}