const sendTelegramMessage = async (videoData, env) => {
    const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    const tgMsg = createTgMsg(videoData);

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: env.TELEGRAM_CHAT_ID,
            text: tgMsg,
            parse_mode: "HTML",
            link_preview_options: {
                is_disabled: videoData.broadcastStatus === 'upcoming',
                url: videoData.url,
                show_above_text: true,
                prefer_small_media: videoData.broadcastStatus === 'live',
            }
        })
    });

    const tgJson = await response.json();
    if (!response.ok) {
        console.error("Ошибка отправки сообщения в Telegram:", result);
    }
    
    return tgJson.message_id;
}

export { sendTelegramMessage };

function createTgMsg(videoData) {
    const bStatus = videoData.broadcastStatus;
    const status = bStatus === 'upcoming'
        ? 'АНОНСИРОВАНО'
        : bStatus === 'live'
            ? 'В ЭФИРЕ'
            : 'ОПУБЛИКОВАНО';

    return `
<b>${status}</b> видео на канале <a href="${videoData.channelUrl}"><b>${videoData.channelTitle}</b></a>
<a href = "${videoData.url}" > ${ videoData.title }</ >

Все подробности на нашем <a href="${env.SITE_URL}"><b>сайте</b></a>`;   

}