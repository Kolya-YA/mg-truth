import type { Env } from "./types";
import { RESPONSE_HEADERS, MAX_PLAYLISTS } from "./config";
import { createYoutubeApiUrls } from "./youtube-api";

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		// Only allow GET requests
		if (request.method !== "GET") {
			return new Response(
				JSON.stringify({
					error: "Method not allowed",
				}),
				{
					status: 405,
					headers: RESPONSE_HEADERS,
				},
			);
		}

		// Validate API key
		if (!env.YOUTUBE_API_KEY) {
			return new Response(
				JSON.stringify({
					error: "YouTube API key not configured",
				}),
				{
					status: 500,
					headers: RESPONSE_HEADERS,
				},
			);
		}
		try {
			const url = new URL(request.url);
			const channelId = url.searchParams.get("channelId");
			const playListsIds = url.searchParams.get("playListsIds");

			if (!channelId) {
				throw new Error("Channel ID is required", {
					cause: { code: "400" },
				});
			}

			const parsedPlaylistIds = playListsIds ? playListsIds.split(",") : [];
			if (parsedPlaylistIds.length === 0) {
				throw new Error("Playlist IDs are required", {
					cause: { code: "400" },
				});
			}

			if (parsedPlaylistIds.length > MAX_PLAYLISTS) {
				throw new Error(`Maximum ${MAX_PLAYLISTS} playlists allowed`, {
					cause: { code: "400" },
				});
			}

			// Create YouTube API URLs
			const youtubeApiUrls = createYoutubeApiUrls(
				channelId,
				parsedPlaylistIds,
				env.YOUTUBE_API_KEY,
			);

			// Forward requests to YouTube API
			const responses = await Promise.all(
				youtubeApiUrls.map((url) => fetch(url)),
			);

			// Parse responses
			const data = await Promise.all(
				responses.map((res) => {
					if (!res.ok) throw new Error(`Failed to fetch: ${res.url}`);
					return res.json();
				}),
			);

			// Return successful response
			return new Response(JSON.stringify(data), {
				headers: RESPONSE_HEADERS,
				status: 200,
			});
		} catch (error) {
			return new Response(
				JSON.stringify({
					error:
						error instanceof Error ? error.message : "Internal server error",
					timestamp: new Date().toISOString(),
				}),
				{
					headers: RESPONSE_HEADERS,
					status:
						error instanceof Error && error.cause && typeof error.cause === 'object' && 'code' in error.cause
							? +(error.cause as { code: string }).code
							: 500,
				},
			);
		}
	},
};
