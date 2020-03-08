import { pool } from './mysql';
import { router } from './router';
import { query } from '../util';

router.get('/api/auth', async(ctx, next) => {
    const token = ctx.cookies.get('userToken');
    ctx.status = 200;
    if (token) {
        const res = await query('select * from userInfo where token = ?', [token]);
        delete res[0].token;
        ctx.body = {
            success: true,
            data: res[0]
        }
    } else {
        ctx.body = {
            success: false,
            data: []
        }
    }
})

router.post('/api/getUserInfo', async ctx => {
    const data = ctx.request.body;
    const res = await query('select * from userInfo where ?', data);
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: res[0]
    }
})