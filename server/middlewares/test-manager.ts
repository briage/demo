import { router } from './router';
import { query } from '../util'

router.post('/api/test-manager/createTest', async ctx => {
    const data = ctx.request.body;
    const res = await query('insert into problems set ?', data);
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: res
    }
})

router.post('/api/test-manager/queryTestList', async ctx => {
    const data = ctx.request.body;
    let sql = 'select * from problems';
    let queryData = [];
    for (let item in data) {
        if (!data[item]) {
            delete data[item];
        } else {
            sql += sql.match('where') ? ' and ?' : ' where ?';
            queryData.push({[item]: data[item]});
        }
    }
    const res = await query(sql, queryData);
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: res
    }
})

router.post('/api/test-manager/updateTest', async ctx => {
    const data = ctx.request.body;
    const problemId = data.problemId;
    delete data.problemId;
    const res = await query('update problems set ? where ?', [data, {problemId}]);
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: res
    }
})

router.post('/api/test-manager/deleteTest', async ctx => {
    const data = ctx.request.body;
    const res = await query('delete from problems where ?', data);
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: res
    }
})