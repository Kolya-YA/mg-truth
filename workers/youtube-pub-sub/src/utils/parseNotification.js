import { XMLParser } from "fast-xml-parser";
import { HtmlError } from "./Errors";

const parseNotification = async (request, env) => {
    const xmlData = await request.text();
    const videoData = await parseXML(xmlData);
    
    // fetch video data by id from Youtube API
    videoData.broadcastStatus = await fetchStatusOfVideo(videoData.videoId, env);
    // console.log("VideoID:", videoData.videoId);
    // Get the message ID from KV
    const publishedMsg = await env.MG_TG_MSG.getWithMetadata(videoData.videoId)
    
    // console.log("Published message:", publishedMsg?.metadata?.broadcastStatus === videoData.broadcastStatus);
    
    if (publishedMsg?.metadata?.broadcastStatus === videoData.broadcastStatus) {
        throw new HtmlError('Already published', 400);
    }
    
    return videoData
}

export { parseNotification };

async function fetchStatusOfVideo(videoId, env) {
    const YOUTUBE_API_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${env.YOUTUBE_API_KEY}`;
    const response = await fetch(YOUTUBE_API_URL);
    if (!response.ok) {
        console.error('Failed to fetch video data:', response.statusText);
        throw new HtmlError('Failed to fetch video data from YouTube', 500);
    }
    const videoResponse = await response.json();
    return videoResponse.items[0]?.snippet?.liveBroadcastContent;
}

async function parseXML(xmlString) {
    const options = {
        ignoreAttributes: false,
        attributeNamePrefix: "@_",
        attributesGroupName: "attrs"
    }
    const parser = new XMLParser(options);

    const result = parser.parse(xmlString);
    const entry = result.feed.entry;
    const videoData = {
        channelTitle: entry.author.name,
        url: entry.link?.attrs['@_href'] || '',
        title: entry.title,
        channelUrl: entry.author.uri,
        channelId: entry["yt:channelId"],
        // now not used
        publishedAt: entry.published,
        videoId: entry["yt:videoId"],
        updatedAt: entry.updated
    }

    return videoData;
}