import { router } from './router';
import fs from 'fs';

let mediaStream;

router.post('/api/live', async ctx => {
    const data = ctx.request.body;
    mediaStream = data.stream;
    const path = `D:/lbhSource/live/888888/${new Date().getTime()}.mp4`;
    // const write = fs.createWriteStream(`D:/lbhSource/live/888888/${new Date().getTime()}.mp4`);
    // fs.writeFileSync(path, data.stream);
    // const blob = new Blob(data.stream)
    // console.log(blob)
    console.log(data)
    ctx.status = 200;
})

async function liveLoad(ctx, next) {
    if (ctx.path.match('\/live\-load')) {
        console.log(mediaStream)
        ctx.status = 200;
        ctx.response.body = {stream: mediaStream};
    } else {
        await next();
    }
 }

 export { liveLoad };
