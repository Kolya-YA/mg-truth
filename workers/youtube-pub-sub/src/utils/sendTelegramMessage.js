import { XMLParser } from "fast-xml-parser";

const sendTelegramMessage = async (xmlString, env) => {
    const TELEGRAM_BOT_TOKEN = env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = env.TELEGRAM_CHAT_ID;
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const videoData = await parseXML(xmlString);
    // console.log("Video data:", videoData);
    const tgMsg = createTgMsg(videoData);

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: tgMsg,
            parse_mode: "HTML",
            disable_web_page_preview: true
        })
    });

    const result = await response.json();
    // console.log("Ответ Telegram:", result);
    if (!response.ok) {
        console.error("Ошибка отправки сообщения в Telegram:", result);
    }

    return new Response('OK', { status: 200 });
}

export { sendTelegramMessage };

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
        // now not used
        publishedAt: entry.published,
        videoId: entry["yt:videoId"],
        channelId: entry["yt:channelId"],
        updatedAt: entry.updated
    }

    return videoData;
}

function createTgMsg(videoData) {
    return `
Новое видео на канале <b>${videoData.channelTitle}</b>
<a href="${videoData.url}">${videoData.title}</a>
<a href="${videoData.channelUrl}">Перейти на канал</a>
    `;
}