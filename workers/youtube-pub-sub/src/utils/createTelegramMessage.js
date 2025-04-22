const createTelegramMessage = (videoData, env) => {
    const bStatus = videoData.broadcastStatus;
    
    const status = bStatus === 'upcoming'
        ? 'АНОНСИРОВАНО'
        : bStatus === 'live'
            ? 'В ЭФИРЕ'
            : 'ОПУБЛИКОВАНО';

    return `
<b>${status}</b> видео <a href = "${videoData.url}" >${videoData.title}</a>

Официальный YouTube канал <a href="${videoData.channelUrl}"><b>${videoData.channelTitle}</b></a>
Подробности на <a href="${env.SITE_URL}"><b>сайте</b></a>`;
}

export { createTelegramMessage };