import * as React from 'react';
import axios from 'axios';
import { Grid, GridProps } from '../components/core/grid';
import { FormContorl } from  '../components/form-components/form-contorl';
import { message } from 'antd';
import _ from 'lodash';
import moment from 'moment';

const { useState } = React;
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
let TYPE = {};
switch (userInfo && +userInfo.type) {
    case 1:
        TYPE = {
            1: '学生'
        };
        break;
    case 2:
        TYPE = {
            1: '学生',
            2: '教师'
        };
        break;
    case 3:
        TYPE = {
            1: '学生',
            2: '教师',
            3: '商家'
        };
        break;
    case 4:
        TYPE = {
            1: '学生',
            2: '教师',
            3: '商家',
            4: '管理员'
        }
}
const SEX = ['男', '女'];

function UserCenter(props) {

    const initalState = {
        queryData: {
            userId: undefined,
            userName: '',
            type: 1,
            phone: undefined
        },
        tableData: []
    }

    const [state, setState] = useState(initalState);

    const handleChange = (type, e) => {
        const newState = _.cloneDeep(state);
        if (type) {
            newState.queryData.type = e;
        } else {
            newState.queryData[e.target.name] = e.target.value;
        }
        setState(newState);
    }

    const gridProps: GridProps = {
        gridOptions: [
            { key: 'userId', dataIndex: 'userId', title: '用户ID' },
            { key: 'userName', dataIndex: 'userName', title: '姓名' },
            { key: 'phone', dataIndex: 'phone', title: '手机号' },
            { key: 'sex', dataIndex: 'sex', title: '性别', render: d => SEX[d] },
            { key: 'email', dataIndex: 'email', title: '邮箱' },
            { key: 'type', dataIndex: 'type', title: '身份', render: d => TYPE[d] }
        ],
        tableData: state.tableData,
        searchRender: () => [
            <FormContorl layout={2} type='number' name='userId' key='userId' value={state.queryData.userId} label='用户ID' />,
            <FormContorl layout={2} type='text' name='userName' key='userName' value={state.queryData.userName} label='姓名' />,
            <FormContorl layout={2} type='number' name='phone' key='phone' value={state.queryData.phone} label='手机号' />,
            <FormContorl layout={2} type='select' key='type' value={+state.queryData.type} label='身份' options={TYPE} onChange={handleChange.bind(this, true)} />
        ],
        handleSearchChange: handleChange.bind(this, false),
        onFetchContent: (e) => {
            e && e.preventDefault();
            const data = _.cloneDeep(state.queryData);
            for (let item in data) {
                if (!data[item]) {
                    delete data[item];
                }
            }
            delete data[''];
            axios.post('/api/getUserInfo', data)
                .then(res => {
                    if (res.data.success) {
                        message.success('查询成功');
                        const newState = _.cloneDeep(state);
                        newState.tableData = res.data.data;
                        setState(newState);
                    }
                })
                .catch(err => {
                    message.error(err);
                    console.error(err);
                })
        }
    }

    return <Grid { ...gridProps } />
}

export { UserCenter };