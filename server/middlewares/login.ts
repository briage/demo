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
            let selfset = {};
            if (data.selfset) {
                const arr = data.selfset.split(/;|；/);
                arr.forEach(item => {
                    if (item) {
                        selfset[item] = true;
                    }
                })
            }
            data.selfset = selfset;
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
        data.token = `${data.phone}${new Date().getTime()}`;
        data.avatar = data.avatar || 'http://192.168.43.136:8888/server/static/img/user.jpeg';
        data.type = 1;
        data.restMoney = 0;
        await query('insert into userInfo set ?', data);
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
        const resData = res[0]
        await query('insert into errortestbook set ?', [{userId: resData.userId}]);
        const errorTestId = await new Promise((resolve, reject) => {
            pool.query({
                sql: "select * from errortestbook where userId = ?",
                timeout: 10000,
                values: [resData.userId]
            }, (err, res, field) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            })
        })
        resData.errorTestId = errorTestId[0].errorTestBookId;
        let selfset = {};
        if (resData.selfset) {
            const arr = resData.selfset.split(/;|；/);
            arr.forEach(item => {
                selfset[item] = true;
            })
        }
        resData.selfset = selfset;
        ctx.body = {
            success: true,
            data: resData,
            status: 0
        }
    }
});

router.post('/api/updateUserInfo', async ctx => {
    const data = _.cloneDeep(ctx.request.body);
    console.log(data)
    const userId = data.userId;
    let selfset = '';
    delete data.userId;
    for (let item in data.selfset) {
        selfset += _.isString(item) ? item +';' : '';
    }
    data.selfset = selfset;
    await query('update userInfo set ? where ?', [data, {userId}]);
    const newData = await new Promise((resolve, reject) => {
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
    let newSelfset = {};
    if (newData[0].selfset) {
        const arr = newData[0].selfset.split(/;|；/);
        arr.forEach(item => {
            newSelfset[item] = true;
        })
    }
    newData[0].selfset = newSelfset;
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: newData[0]
    }
})

router.post('/api/recentRecord', async ctx => {
    const data = ctx.request.body;
    const oldData = await new Promise((resolve, reject) => {
        pool.query({
            sql: "select * from userInfo where userId = ?",
            timeout: 10000,
            values: [data.userId]
        }, (err, res, field) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        })
    })
    delete data.selfset;
    data.recentStudy = `${data.courseId};${oldData[0].recentStudy || ''}`;
    delete data.courseId;
    
    await query('update userInfo set ? where ?', [data, {userId: data.userId}]);
    const res = await new Promise((resolve, reject) => {
        pool.query({
            sql: "select * from userInfo where userId = ?",
            timeout: 10000,
            values: [data.userId]
        }, (err, res, field) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        })
    })
    let newSelfset = {};
    if (res[0].selfset) {
        const arr = res[0].selfset.split(/;|；/);
        arr.forEach(item => {
            newSelfset[item] = true;
        })
    }
    res[0].selfset = newSelfset;
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: res[0]
    }
})

router.post('/api/getRank', async ctx => {
    const res: any[] = <any[]>(await query('select * from userInfo where type=1'));
    const data = {
        studyTime: [],
        achievementRate: [],
        praticeNum: []
    }
    data.studyTime = _.cloneDeep(res.sort((a, b) => {
        const aTime = +a.studyTime || 0;
        const bTime = +b.studyTime || 0;
        return bTime - aTime;
    }))
    data.achievementRate =_.cloneDeep(res.sort((a, b) => {
        const aAchievement = +a.achievementRate || 0;
        const bAchievement = +b.achievementRate || 0;
        return bAchievement - aAchievement;
    }))
    data.praticeNum = _.cloneDeep(res.sort((a, b) => {
        const aTestNum = +a.praticeNum || 0;
        const bTestNum = +b.praticeNum || 0;
        return bTestNum - aTestNum;
    }))
    data.studyTime = data.studyTime.splice(0, 1000);
    data.achievementRate = data.achievementRate.splice(0, 1000);
    data.praticeNum = data.praticeNum.splice(0, 1000);
    ctx.status = 200;
    ctx.body = {
        success: true,
        data
    }
})