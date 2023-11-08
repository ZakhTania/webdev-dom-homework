export function sanitizeHtml(htmlString) {
    return htmlString
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;');
}

export function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}

export function replaceQuote(text) {
    const newTextBgn = text.replaceAll('QUOTE_BGN', '<div class="quote">');
    const newTextEnd = newTextBgn.replaceAll('QUOTE_END', '</div>');
    return newTextEnd;
}
// export function dateFormat(commentDate) {

//     let date = new Date(commentDate);
//     const addZeroBefore = (time) => time < 10 ? time = "0" + time : time;

//     let day = addZeroBefore(date.getDate());
//     let month = addZeroBefore(date.getMonth() + 1);
//     let yaer = date.getFullYear().toString().slice(2);
//     let hour = addZeroBefore(date.getHours());
//     let minute = addZeroBefore(date.getMinutes());

//     let dateComment = `${day}.${month}.${yaer} ${hour}:${minute}`;

//     return dateComment;

// }
