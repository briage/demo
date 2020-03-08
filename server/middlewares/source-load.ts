 import fs from 'fs';
 
 async function sourceLoad(ctx, next) {
    if (ctx.path.match('\/server\/static/')) {
        ctx.status = 200;
        ctx.response.body = fs.createReadStream(`D:/lbhSource/${ctx.path.split('server/static/')[1]}`);
    } else {
        await next();
    }
 }

 export { sourceLoad };