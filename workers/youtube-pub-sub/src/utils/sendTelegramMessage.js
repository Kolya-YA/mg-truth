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
            disable_web_page_preview: true
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
        ? 'Запланированно'
        : bStatus === 'live'
            ? 'В эфире'
            : 'Опубликовано';

    return `
<a href="${videoData.url}">${videoData.title}</a>
<u>${status}</u> видео на канале <b>${videoData.channelTitle}</b>
<a href="${videoData.channelUrl}">Перейти на канал</a>`;
}