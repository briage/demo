import Router from 'koa-router';
import fs from 'fs';
import path from 'path';
import koaBody from 'koa-body'

const router = new Router();

router.get('/api/test', async (ctx: any, next: () => {}) => {
    // if (!ctx.url.match(/\/api/)) {
    //     ctx.status = 200;
    //     let content = fs.readFileSync(path.resolve(__dirname, '../../dist/index.html')).toString();
    //     ctx.body = content;
    // }
    await next();
});
export default router;
