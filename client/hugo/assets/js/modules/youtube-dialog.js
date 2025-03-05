console.log('youtube-dialog.js loaded');

const youtubeTriggers = document.querySelectorAll('[data-video-id]');
const youtubeDialog = document.getElementById('youtubeDialog')
const youtubeIframe = youtubeDialog.querySelector('#youtubeIframe');
const closeBtn = youtubeDialog.querySelector('.close-btn');

youtubeTriggers.forEach(trigger => {
    trigger.addEventListener('click', e => {
        const videoId = e.currentTarget.getAttribute('data-video-id');
        console.log(e.currentTarget);
        console.log(`youtubeTriggers clicked - ${videoId}`);
        const videoTitle = e.currentTarget.getAttribute('data-video-title');
        youtubeIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;

        youtubeDialog.showModal();
        closeBtn.focus();
    });
});

closeBtn.addEventListener('click', () => {
    youtubeDialog.close();
    youtubeIframe.src = '';
});

youtubeDialog.addEventListener('click', e => {
    if (e.target === youtubeDialog) {
        youtubeDialog.close();
        youtubeIframe.src = '';
    }
});