import {router} from './router';
import { pool } from './mysql';
import _ from 'lodash';
import { query } from '../util';
import { createCourseRes } from './course'

router.post('/api/login', async(ctx, next) => {
    const data = ctx.request.body;
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
        delete data.selfset;
        for (let item in data) {
            if (data[item] === undefined) {
                delete data[item];
            }
        }
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
        const errorbookInfo: createCourseRes = <createCourseRes>(await query('insert into errortestbook set ?', [{userId: resData.userId}]));
        resData.errorTestId = errorbookInfo.insertId;
        await query('update userInfo set ? where ?', [resData, {phone: resData.phone}])
        resData.selfset = {};
        ctx.body = {
            success: true,
            data: resData,
            status: 0
        }
    }
});

router.post('/api/updateUserInfo', async ctx => {
    const data = _.cloneDeep(ctx.request.body);
    const phone = data.phone;
    const userId = data.userId;
    let selfset = '';
    if (data.selfset) {
        for (let item in data.selfset) {
            if (item && _.isNaN(+item)) {
                selfset += _.isString(item) ? item +';' : '';
            }
        }
        data.selfset = selfset;
    }
    if (_.isNumber(data.rightNum)) {
        const currentUserInfo = (await query('select * from userInfo where ?', {userId}))[0];
        data.achievementRate = (((currentUserInfo.achievementRate / 100) * +currentUserInfo.praticeNum + data.rightNum) / ((+currentUserInfo.praticeNum || 0) + data.praticeNum)) * 100;
        data.praticeNum += (+currentUserInfo.praticeNum) || 0;
    }
    delete data.rightNum;
    await query('update userInfo set ? where ?', [data, {phone}]);
    const newData = await new Promise((resolve, reject) => {
        pool.query({
            sql: "select * from userInfo where phone = ?",
            timeout: 10000,
            values: [phone]
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
            if (item && _.isNaN(+item)) {
                newSelfset[item] = true;
            }
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
    data.recentStudy = [...new Set(`${data.courseId};${oldData[0].recentStudy || ''}`.split(/;|；/))].join(';');
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