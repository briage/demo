import { router } from './router';
import { query } from '../util';
import { pool } from './mysql';

router.post('/api/getUserInfo', async ctx => {
    const data = ctx.request.body;
    console.log(data)
    const res = await query('select * from userInfo where ?', data);
    console.log(data, res[0])
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: res
    }
})

router.post('/api/joinCourse', async ctx => {
    const data = ctx.request.body;
    const { userId, courseId } = data;
    const userInfo = await new Promise((resolve, reject) => {
        pool.query({
            sql: "select * from userInfo where userId = ?",
            timeout: 10000,
            values: [userId]
        }, (err, res, field) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        })
    })
    const courseInfo = await new Promise((resolve, reject) => {
        pool.query({
            sql: "select * from class where courseId = ?",
            timeout: 10000,
            values: [courseId]
        }, (err, res, field) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        })
    })
    let courseIds = userInfo[0].courseIds || '';
    let studentIds = courseInfo[0].studentIds || '';
    userInfo[0].restMoney -= courseInfo[0].money;
    courseIds += `${courseId};`;
    studentIds += `${userId};`
    await query('update userInfo set ? where ?', [{courseIds, restMoney: userInfo[0].restMoney }, {userId}]);
    await query('update class set ? where ?', [{studentIds}, {courseId}]);
    userInfo[0].courseIds = courseIds;
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: userInfo[0]
    }
})

router.post('/api/error-book/queryErrorBookInfo', async ctx => {
    const data = ctx.request.body;
    const res = await query('select * from errortestbook where ?', data);
    res[0].onlyChoiceNum = res[0].onlyChoiceIds && res[0].onlyChoiceIds.split(/;|；/).filter(item => !!item).length || 0;
    res[0].multifyChoiceNum = res[0].multifyChoiceIds && res[0].multifyChoiceIds.split(/;|；/).filter(item => !!item).length || 0;
    res[0].listenNum = res[0].listenIds && res[0].listenIds.split(/;|；/).filter(item => !!item).length || 0;
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: res[0]
    }
})

router.post('/api/error-book/updateErrorBook', async ctx => {
    const data = ctx.request.body;
    const {errorTestBookId} = data;
    const oldErrorInfo = await query('select * from errortestbook where ?', {errorTestBookId})[0];
    oldErrorInfo.onlyChoiceIds += data.onlyChoiceIds || '';
    oldErrorInfo.multifyChoiceIds += data.multifyChoiceIds || '';
    oldErrorInfo.listenIds += data.listenIds || '';
    await query('update errortestbook set ? where ?', [oldErrorInfo, {errorTestBookId}]);
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: []
    }
})