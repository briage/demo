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
    if (data.courseName) {
        sql += ` where courseName like '%${data.courseName}%'`;
        delete data.courseName;
    }
    for (let item in data) {
        if (!data[item]) {
            delete data[item];
        } else {
            sql += sql.match('where') ? 'and ?' : ' where ?';
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
router.post('/api/course/deleteCourse', async ctx => {
    const data = ctx.request.body;
    const res = await query('delete from class where ?', data);
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: res
    }
})