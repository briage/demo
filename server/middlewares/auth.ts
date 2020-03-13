import { pool } from './mysql';
import { router } from './router';
import { query } from '../util';
import _ from 'lodash';

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
    const data = _.cloneDeep(ctx.request.body);
    let sql = 'select * from userInfo'
    let insert = [];
    for (let item in data) {
        if (!data[item]) {
            delete data[item];
        } else {
            sql += sql.match('where') ? ' and ?' : ' where ?';
            insert.push({[item]: data[item]})
        }
    }
    const res = await query(sql, insert);
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: res
    }
})