import { router } from './router';
import koaBody from 'koa-body';
import fs from 'fs';

router.post('/api/upload', async ctx => {
    console.log(ctx.request.files)
    const files = ctx.request.files;
    let key = '';
    for (let item in files) {
        key = item;
    }
    const reader = fs.createReadStream(files[key].path);
    const filePath = `D:/lbhSource/${files[key].type.match('video') ? 'video' : 'img'}/${files[key].name}`;
    const remoteFilePath = `http://localhost:8080/server/static/${files[key].type.match('video') ? 'video' : 'img'}/${files[key].name}`;
    const wR = fs.createWriteStream(filePath);
    reader.pipe(wR);
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: remoteFilePath
    }
})