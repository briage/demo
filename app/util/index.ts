import axios from 'axios';
import { message } from 'antd';
/**
 * 
 * @param type 处理类型 校验:0  查询：1
 * @param userId 用户ID
 * @param userType 要校验的身份 1:学生 2:教师 3:商家
 */
async function handleUserInfo(type: 0 | 1, userId: number, userType?: 1 | 2 | 3) {
    const userInfo = await axios.post('/api/getUserInfo', {userId})
            .then(res => {
                if (res.data.success) {
                    message.success('查询成功');
                    return res.data.data;
                } else {
                    message.error('查询用户信息失败')
                }
            })
            .catch(err => {
                console.error(err);
            })
    if (type) {
        return userInfo;
    } else {
        return userInfo.type === userType;
    }
}

export { handleUserInfo };