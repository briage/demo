import { pool } from './mysql';
import { router } from './router';
import koaBody from 'koa-body';
import { query } from '../util/index';
import _ from 'lodash';

interface createCourseRes {
    affectedRows: number,
    changedRows: number,
    fieldCount: number,
    insertId: number,
    message: string,
    protocol41: boolean,
    serverStatus: number,
    warningCount: number
}

router.post('/api/course/createCourse', async (ctx, next) => {
    const data = ctx.request.body;
    const resData = {
        success: false,
        data: {}
    }
    const res: createCourseRes = <createCourseRes>(await query('insert into class set ?', data));
    ctx.status = 200;
    resData.success = res.insertId ? true : false;
    resData.data = res;
    ctx.body = resData;
})
router.post('/api/course/updateCourse', async ctx => {
    const data = _.cloneDeep(ctx.request.body);
    const courseId = data.courseId;
    delete data.courseId;
    const resData = {
        success: false,
        data: {}
    }
    const res = await query('update class set ? where courseId = ?', [data, courseId])
    ctx.status = 200;
    resData.success = true;
    resData.data = res;
    ctx.body = resData;
})
router.post('/api/course/queryCourseList', async (ctx, next) => {
    const data = _.cloneDeep(ctx.request.body);
    let sql = 'select * from class'
    let insert = [];
    let isPage = false;
    const offset = data.offset;
    const labels = data.labels;
    const selfset = data.selfset;
    const hot = data.hot;
    delete data.hot;
    delete data.selfset;
    delete data.labels;
    if (!_.isNaN(+offset)) {
        isPage = true;
    }
    delete data.offset;
    if (data.courseName) {
        sql += ` where courseName like '%${data.courseName.split('').join('%')}%'`;
    }
    delete data.courseName;
    if (data.startMoney && data.endMoney) {
        sql += `${sql.match ('where') ? ' and' : ' where'} money between ${data.startMoney} and ${data.endMoney}`;
    }
    delete data.startMoney;
    delete data.endMoney;
    for (let item in data) {
        if (data[item] === undefined || data[item] === '') {
            delete data[item];
        } else {
            sql += sql.match('where') ? ' and ?' : ' where ?';
            insert.push({[item]: data[item]})
        }
    }
    let res: any[] = <any[]>(await query(sql, insert));
    let start = 0;
    if (_.isNumber(offset) && offset > 0) {
        start = offset * 10;
    }
    let useSelfset = false;
    for (let item in selfset) {
        if (item) {
            useSelfset = true;
        }
    }
    for (let label in labels) {
        if (label) {
            useSelfset = false;
            break;
        }
    }
    if (useSelfset && _.isObject(selfset)) {
        res = res.filter(item => {
            let isPass = false;
            for (let selfsetItem in selfset) {
                if (selfsetItem && item.labels.indexOf(selfsetItem) !== -1) {
                    isPass = true;
                    break;
                }
            }
            return isPass;
        })
    } else {
        res = res.filter(item => {
            let isPass = true;
            for (let label in labels) {
                if (item.labels.indexOf(label) === -1) {
                    isPass = false;
                    break;
                }
            }
            return isPass;
        })
    }
    if (hot) {
        res = res.sort((a, b) => {
            const aUsedNum = a.studentIds ? a.studentIds.split(/;|；/).length : 0;
            const bUsedNum = b.studentIds ? b.studentIds.split(/;|；/).length : 0;
            return bUsedNum - aUsedNum;
        });
    }
    const total = res.length;
    const resData = _.isNumber(offset) ? res.splice(start, 10) : res;
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: resData,
        total
    }
})
router.post('/api/course/deleteCourse', async ctx => {
    const data = ctx.request.body;
    const res = await query('delete from class where ?', data);
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: res
    }
})