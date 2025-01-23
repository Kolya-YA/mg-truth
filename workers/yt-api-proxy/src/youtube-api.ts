import { YOUTUBE_API_BASE_URL } from "./config";

export function createYoutubeApiUrls(
	channelId: string,
	playListsIds: string[],
	apiKey: string,
) {
	const youtubeApiEndpoints = {
		channels: "brandingSettings,id,snippet,statistics",
		playlistItems: "contentDetails,id,snippet,status",
	};

	const youtubeApiUrls: URL[] = [];
	for (const [endpoint, parts] of Object.entries(youtubeApiEndpoints)) {
		if (endpoint === "channels") {
			const youtubeApiUrl = buildYoutubeApiUrl(
				endpoint,
				parts,
				apiKey,
				channelId,
			);
			youtubeApiUrls.push(youtubeApiUrl);
		} else if (endpoint === "playlistItems") {
			for (const playlistId of playListsIds) {
				const youtubeApiUrl = buildYoutubeApiUrl(
					endpoint,
					parts,
					apiKey,
					channelId,
					playlistId,
				);
				youtubeApiUrls.push(youtubeApiUrl);
			}
		}
	}
    return youtubeApiUrls.map((url) => url.toString());
}

function buildYoutubeApiUrl(
	endpoint: string,
	parts: string,
	key: string,
	channelId: string,
	playlistId?: string,
): URL {
	const youtubeApiUrl = new URL(`${YOUTUBE_API_BASE_URL}/${endpoint}`);
	youtubeApiUrl.searchParams.append("key", key);
	youtubeApiUrl.searchParams.append("part", parts);

	if (playlistId) {
		youtubeApiUrl.searchParams.append("playlistId", playlistId);
	} else {
		youtubeApiUrl.searchParams.append("id", channelId);
	}

	return youtubeApiUrl;
}
