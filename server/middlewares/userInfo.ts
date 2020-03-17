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