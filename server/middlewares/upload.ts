import { router } from './router';
import koaBody from 'koa-body';
import fs from 'fs';

router.post('/api/upload', async ctx => {
    const files = ctx.request.files;
    let key = '';
    for (let item in files) {
        key = item;
    }
    const reader = fs.createReadStream(files[key].path);
    const fileName = new Date().getTime() + Math.floor(Math.random() * 100000);
    const filePath = `D:/lbhSource/${files[key].type.match('image') ? 'img' : 'video'}/${fileName}.${files[key].name.split('.').pop()}`;
    const remoteFilePath = `http://192.168.43.136:8888/server/static/${files[key].type.match('image') ? 'img' : 'video'}/${fileName}.${files[key].name.split('.').pop()}`;
    const wR = fs.createWriteStream(filePath);
    reader.pipe(wR);
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: remoteFilePath
    }
})