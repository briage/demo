import { pool } from './mysql';
import { router } from './router';
import { query } from '../util'
import _ from 'lodash';

interface createNodeRes {
    affectedRows: number,
    changedRows: number,
    fieldCount: number,
    insertId: number,
    message: string,
    protocol41: boolean,
    serverStatus: number,
    warningCount: number
}

async function updateSubcourseIds(courseId) {
    const subCourses: any[] = <any[]>(await query('select * from subCourses where ?', [{courseId}]));
    let subcourseIds = '';
    subCourses.forEach(item => {
        subcourseIds += item.subcourseId + ';';
    });
    await query('update class set ? where ?', [{subcourseIds}, {courseId}]);
}

router.post('/api/node-manage/createNode', async ctx => {
    const data = ctx.request.body;
    const courseId = data.courseId;
    const res: createNodeRes = <createNodeRes>( await query('insert into subcourses set ?', data));
    await updateSubcourseIds(courseId);
    ctx.status = 200;
    if (res.insertId) {
        ctx.body = {
            success: true,
            data: res
        }
    }
})

router.post('/api/node-manage/queryNodeList', async ctx => {
    const data = _.cloneDeep(ctx.request.body);
    let sql = 'select * from subcourses';
    let insert = [];
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

router.post('/api/node-manage/updateNode', async ctx => {
    const data = _.cloneDeep(ctx.request.body);
    const {subcourseId, courseId} = data;
    delete data.subcourseId;
    const res: createNodeRes = <createNodeRes>( await query('update subcourses set ? where ?', [data, {subcourseId}]));
    await updateSubcourseIds(courseId);
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: res
    }
})

router.post('/api/node-manage/deleteNode', async ctx => {
    const data = ctx.request.body;
    const res = await query('delete from subcourses where ?', data);
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: res
    }
})