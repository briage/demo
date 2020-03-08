import {router} from './router';
import { pool } from './mysql';
import koaBody from 'koa-body';
import _ from 'lodash';

router.post('/api/login', async(ctx, next) => {
    const data = ctx.request.body;
    console.log('login')
    const res = await new Promise((resolve, reject) => {
        pool.query({
            sql: "select * from userInfo where phone= ?",
            timeout: 10000,
            values: [data.phone]
        }, (err, res, field) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        })
    })
    ctx.status = 200;
    if (res[0] && data.password === res[0].password) {
        let data = _.cloneDeep(res[0]);
        ctx.cookies.set('userToken', data.token, {httpOnly: false})
        delete data.token;
        ctx.body = {
            success: true,
            data: data
        }
    } else {
        ctx.body = {
            success: false,
            data: []
        }
    }
})
