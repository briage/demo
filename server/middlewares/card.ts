import { router } from "./router";
import { query } from "../util";
import moment from "moment";

router.post('/api/card/queryCardList', async ctx => {
    const data = ctx.request.body;
    const offset = data.offset || 0;
    let res = <any[]>(await query('select * from card'));
    res = res.reverse();
    res = res.filter(item => {
        if (!item.isPublic) {
            console.log(data.userId, item.userId)
            return data.userId == item.userId;
        }
        return true;
    });
    let resData = res.slice(offset * 10, (offset * 10) + 10);
    const userInfoList = await Promise.all(resData.map(item => query('select * from userInfo where ?', {userId: item.userId})));
    resData = resData.map((item, index) => {
        item.userName = userInfoList[index][0].userName;
        item.avatar = userInfoList[index][0].avatar;
        return item;
    });
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: resData,
        total: res.length
    }
})

router.post('/api/card/createCard', async ctx => {
    const data = ctx.request.body;
    await query('insert into card set ?', data);
    ctx.status = 200;
    ctx.body = {
        success: true,
        data: []
    }
})

router.post('/api/card/like', async ctx => {
    const data = ctx.request.body;
    const { userId, cardInfo } = data;
    if (cardInfo.likeUserIds && cardInfo.likeUserIds.indexOf(userId) !== -1) {
        cardInfo.likeUserIds = cardInfo.likeUserIds.replace(`${userId};`, '');
    } else {
        cardInfo.likeUserIds = (cardInfo.likeUserIds || '') + `${userId};`;
    }
    await query('update card set ? where ?', [{likeUserIds: cardInfo.likeUserIds}, {cardId: cardInfo.cardId}]);
    ctx.status = 200;
    ctx.body = {
        success: true,
        likeUserIds: cardInfo.likeUserIds
    }
})