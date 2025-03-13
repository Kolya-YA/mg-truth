const showDateTime = document.querySelectorAll('[data-unixtime]')

showDateTime.forEach(el => {
    const unixtime = parseInt(el.getAttribute('data-unixtime'), 10)
    let timeText = el.getAttribute('data-time-text')
    timeText = timeText ? `${timeText} ` : ''
    const date = new Date(unixtime * 1000)
    const localTimeString = date.toLocaleString()
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    el.textContent = `${timeText}${localTimeString} ${timeZone}`
})

