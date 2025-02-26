export interface Env {
	YOUTUBE_API_KEY: string;
	YOUTUBE_CHANNEL_ID: string;
}

export interface VideoData {
	id: string;
	title: string;
	description: string;
	publishedAt: string;
	thumbnails: {
		default?: YouTubeThumbnail;
		medium?: YouTubeThumbnail;
		high?: YouTubeThumbnail;
		standard?: YouTubeThumbnail;
		maxres?: YouTubeThumbnail;
	};
	liveBroadcastContent?: string;
	// channelTitle: string;
	// viewCount?: string;
	// likeCount?: string;
	// duration?: string;
}

export interface ChannelData {
	id: string;
	title: string;
	description: string;
	thumbnails: any;
	statistics: {
		viewCount: string;
		subscriberCount: string;
		videoCount: string;
	};
	customUrl?: string;
	country?: string;
}

export interface YoutubeResponse {
	channel: ChannelData;
	videos: VideoData[];
}

// YouTube API response types
export interface YouTubeSearchResponse {
	kind: string;
	etag: string;
	nextPageToken?: string;
	prevPageToken?: string;
	regionCode?: string;
	pageInfo: {
		totalResults: number;
		resultsPerPage: number;
	};
	items: YouTubeSearchItem[];
}

export interface YouTubeSearchItem {
	kind: string;
	etag: string;
	id: {
		kind: string;
		videoId: string;
		channelId?: string;
		playlistId?: string;
	};
	snippet: {
		publishedAt: string;
		channelId: string;
		title: string;
		description: string;
		thumbnails: {
			default?: YouTubeThumbnail;
			medium?: YouTubeThumbnail;
			high?: YouTubeThumbnail;
			standard?: YouTubeThumbnail;
			maxres?: YouTubeThumbnail;
		};
		channelTitle: string;
		liveBroadcastContent?: string;
		publishTime: string;
	};
}

export interface YouTubeChannelsResponse {
	kind: string;
	etag: string;
	pageInfo: {
		totalResults: number;
		resultsPerPage: number;
	};
	items: YouTubeChannelItem[];
}

export interface YouTubeChannelItem {
	kind: string;
	etag: string;
	id: string;
	snippet: {
		title: string;
		description: string;
		customUrl?: string;
		publishedAt: string;
		thumbnails: {
			default?: YouTubeThumbnail;
			medium?: YouTubeThumbnail;
			high?: YouTubeThumbnail;
		};
		localized?: {
			title: string;
			description: string;
		};
		country?: string;
	};
	statistics: {
		viewCount: string;
		subscriberCount: string;
		hiddenSubscriberCount: boolean;
		videoCount: string;
	};
}

export interface YouTubeThumbnail {
	url: string;
	width: number;
	height: number;
}