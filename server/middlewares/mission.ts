import { router } from "./router";
import { query } from "../util";
import moment from "moment";

router.post('/api/mission/queryMissionList', async ctx => {
    const data = ctx.request.body;
    let sql = 'select * from missions';
    let values = [];
    const courseIds = data.courseIds;
    const currentTime = data.currentTime;
    delete data.currentTime;
    delete data.courseIds;
    for (let item in data) {
        if (data[item]) {
            sql += sql.match('where') ? ' and ?' : ' where ?';
            values.push({item: data[item]});
        }
    }
    const res: any[] = <any[]>(await query(sql, values));
    let resData = res;
    if (courseIds || currentTime) {
        resData = [];
        if (courseIds) {
            resData = res.filter(item => !!courseIds.match(item.courseId));
        }
        if (currentTime) {
            resData = resData.filter(item => (moment(item.startTime) <= moment(currentTime)) && (moment(item.endTime) > moment(currentTime)));
        }
    }
    const [courseList, userInfoList] = await Promise.all([
        Promise.all(resData.map(item => query('select * from class where ?', {courseId: item.courseId}))),
        Promise.all(resData.map(item => query('select * from userInfo where ?', {userId: item.creatorId})))
    ]);
    resData = resData.map((item, index) => {
        const newData = item;
        newData.courseName = courseList[index][0].courseName;
        newData.creatorName = userInfoList[index][0].userName;
        return newData;
    })
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: resData
    } 
});

router.post('/api/mission/createMission', async ctx => {
    const data = ctx.request.body;
    await query('insert into missions set ?', data);
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: []
    }
})

router.post('/api/mission/updateMission', async ctx => {
    const { missionId, testpaperId, startTime, creatorId, message, courseId, endTime } = ctx.request.body;
    const data = {
        testpaperId,
        startTime,
        creatorId,
        message,
        courseId,
        endTime
    }
    await query('update missions set ? where ?', [data, { missionId }]);
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: []
    }
})

router.post('/api/mission/deleteMission', async ctx => {
    const data = ctx.request.body;
    await query('delete from missions where ?', data);
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: []
    }
})