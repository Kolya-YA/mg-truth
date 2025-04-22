import { createTelegramMessage } from "./createTelegramMessage";

const sendTelegramMessage = async (videoData, env) => {
    const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    const telegramMessage = createTelegramMessage(videoData, env);

    console.log('Telegram message:', telegramMessage);

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: env.TELEGRAM_CHAT_ID,
            text: telegramMessage,
            parse_mode: "HTML",
            link_preview_options: {
                is_disabled: videoData.broadcastStatus === 'upcoming',
                url: videoData.url,
                // show_above_text: true,
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