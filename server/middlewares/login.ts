import {router} from './router';
import { pool } from './mysql';
import koaBody from 'koa-body';
import _ from 'lodash';
import { query } from '../util';

router.post('/api/login', async(ctx, next) => {
    const data = ctx.request.body;
    console.log('login')
    const res = await new Promise((resolve, reject) => {
        pool.query({
            sql: "select * from userInfo where phone = ?",
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
    if (res[0]) {
        if (data.password === res[0].password) {
            let data = _.cloneDeep(res[0]);
            ctx.cookies.set('userToken', data.token, {httpOnly: false})
            delete data.token;
            ctx.body = {
                success: true,
                data: data,
                status: 1
            }
        } else {
            ctx.body = {
                success: false,
                data: []
            }
        }
    } else {
        data.token = `${data.phone}${new Date().getTime()}`
        await query('insert into userInfo set ?', data);
        const resData = await query('select * from userInfo where phone = ?', [data.phone]);
        ctx.body = {
            success: true,
            data: resData[0],
            status: 0
        }
    }
});

router.post('/api/updateUserInfo', async ctx => {
    const data = _.cloneDeep(ctx.request.body);
    const userId = data.userId;
    let selfset = '';
    const originSelfset = data.selfset;
    delete data.userId;
    for (let item in data.selfset) {
        selfset += item +';';
    }
    data.selfset = selfset;
    await query('update userInfo set ? where ?', [data, {userId}]);
    data.selfset = originSelfset;
    data.userId = userId;
    ctx.status = 200;
    ctx.body = {
        success: true,
        data
    }
})
