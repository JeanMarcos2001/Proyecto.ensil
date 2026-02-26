const https = require('https');

https.get('https://www.youtube.com/@EnsilLecturaIntegral/videos', (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        const regex = /"videoId":"([a-zA-Z0-9_-]{11})"/g;
        let match;
        const ids = new Set();
        while ((match = regex.exec(data)) !== null) {
            ids.add(match[1]);
        }
        console.log(Array.from(ids).slice(0, 10).join(','));
    });
}).on('error', (err) => {
    console.log('Error: ' + err.message);
});
