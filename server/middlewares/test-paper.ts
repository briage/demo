import { router } from './router';
import { query } from '../util';
import _ from 'lodash';

async function queryProblemIds(sql, values, num) {
    const res: any[] = <any[]>(await query(sql, values));
    let ids = '';
    for (let i = 0; i < +num; i ++) {
        let index = Math.floor(Math.random() * res.length);
        ids += res[index].problemId + ';';
        res.splice(index, 1);
    }
    return ids;
}
async function autoCreateTestPaper(data) {
    let sql = `select * from problems where ?`;
    let values: any[] = [];
    if (data.diffculty > 0) {
        values.push({diffculty: data.diffculty});
        sql += ' and ?'
    }
    if (data.labels) {
        sql += ` and labels like '%${data.labels}%'`;
    }
    if (+data.onlyChoiceNum) {
        let value = _.cloneDeep(values);
        value.push({type: 1});
        data.onlyChoiceIds = await queryProblemIds(sql, value, data.onlyChoiceNum);
    }
    if (+data.multifyChoiceNum) {
        let value = _.cloneDeep(values);
        value.push({type: 2});
        data.multifyChoiceIds = await queryProblemIds(sql, value, data.multifyChoiceNum);
    }
    if (+data.listenNum) {
        let value = _.cloneDeep(values);
        value.push({type: 4});
        data.listenIds = await queryProblemIds(sql, value, data.listenNum);
    }
    if (+data.writeNum) {
        let value = _.cloneDeep(values);
        value.push({type: 3});
        data.writeIds = await queryProblemIds(sql, value, data.writeNum);
    }
    return data;
}

async function checkTestType(data) {
    let sql = 'select * from problems where ? and ?';
    let values: any[] = [{ problemId: data.problemId }, { type: data.type }];
    if (data.diffculty) {
        sql += ' and ?';
        values.push({ diffculty: data.diffculty });
    }
    if (data.labels) {
        sql += ' and ?';
        values.push({ labels: data.labels });
    }
    const res: any[] = <any[]>(await query(sql, values));
    if (res.length) {
        return res[0].goal;
    } else {
        return false;
    }
}

router.post('/api/test-paper/createTestPaper', async ctx => {
    let data = _.cloneDeep(ctx.request.body);
    if (+data.type) {
        data = await autoCreateTestPaper(data);
    }
    data.totalGoal = 0;

    if (data.onlyChoiceIds) {
        data.totalGoal += await checkTestArrType(ctx, { ids: data.onlyChoiceIds, type: 1, labels: data.labels, diffculty: data.diffculty });
    }
    if (data.multifyChoiceIds) {
        data.totalGoal += await checkTestArrType(ctx, { ids: data.multifyChoiceIds, type: 2, labels: data.labels, diffculty: data.diffculty });
    }
    if (data.listenIds) {
        data.totalGoal += await checkTestArrType(ctx, { ids: data.listenIds, type: 4, labels: data.labels, diffculty: data.diffculty });
    }
    if (data.writeIds) {
        data.totalGoal += await checkTestArrType(ctx, { ids: data.writeIds, type: 3, labels: data.labels, diffculty: data.diffculty });
    }
    delete data.type;
    delete data.onlyChoiceNum;
    delete data.multifyChoiceNum;
    delete data.listenNum;
    delete data.writeNum;
    const res = await query('insert into testpapers set ?', data);
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: res
    }
})

async function checkTestArrType(ctx, data) {
    const ids = data.ids.split(/;|；/);
        const resArr = await Promise.all(ids.map(item => checkTestType({problemId: item, type: data.type, labels: data.labels, diffculty: data.diffculty})));
        let totalGoal = 0;
        resArr.forEach((item, index) => {
            if (!item) {
                ctx.body = {
                    success: false,
                    data: [],
                    message: `题目ID为${ids[index]}的试题不符合题型要求或试题标签不符合试卷标签或题目难度不符合试卷难度`
                }
            } else {
                totalGoal += +item;
            }
        })
        return totalGoal;
}

router.post('/api/test-paper/updateTestPaper', async ctx => {
    const data = _.cloneDeep(ctx.request.body);
    const testpaperId = data.testpaperId;
    ctx.status = 200;
    data.totalGoal = 0;

    if (data.onlyChoiceIds) {
        data.totalGoal += await checkTestArrType(ctx, { ids: data.onlyChoiceIds, type: 1, labels: data.labels, diffculty: data.diffculty });
    }
    if (data.multifyChoiceIds) {
        data.totalGoal += await checkTestArrType(ctx, { ids: data.multifyChoiceIds, type: 2, labels: data.labels, diffculty: data.diffculty });
    }
    if (data.listenIds) {
        data.totalGoal += await checkTestArrType(ctx, { ids: data.listenIds, type: 4, labels: data.labels, diffculty: data.diffculty });
    }
    if (data.writeIds) {
        data.totalGoal += await checkTestArrType(ctx, { ids: data.writeIds, type: 3, labels: data.labels, diffculty: data.diffculty });
    }

    delete data.type;
    delete data.testpaperId;
    delete data.onlyChoiceNum;
    delete data.multifyChoiceNum;
    delete data.listenNum;
    delete data.writeNum;
    const res = await query('update testpapers set ? where ?', [data, { testpaperId }]);
    
    ctx.body = {
        success: true,
        data: res
    }
})

router.post('/api/test-paper/queryTestPaper', async ctx => {
    const data = _.cloneDeep(ctx.request.body);
    let sql = 'select * from testpapers';
    let queryData = [];
    if (data.labels) {
        sql += ` where labels like '%${data.labels}%'`
        delete data.labels;
    }
    if (data.testpaperName) {
        sql += `${sql.match('where') ? 'and' : 'where'} labels like '%${data.labels}%'`
        delete data.testpaperName;
    }
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

router.post('/api/test-paper/deleteTestPaper', async ctx => {
    const res = await query('delete from testpapers where ?', [ctx.request.body]);
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: res
    }
})
