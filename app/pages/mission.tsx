import * as React from 'react';
import { Grid, GridProps } from '../components/core/grid';
import _ from 'lodash';
import { userInfo_Type } from '../../types';
import { Button, message, Popconfirm } from 'antd';
import Axios from 'axios';
import { FormContorl } from '../components/form-components/form-contorl';
import { Form } from '../components/form-components/form';
import moment from 'moment';

const { useReducer, useEffect } = React;

function reducer(state, action) {
    if (action.key) {
        const newState = _.cloneDeep(state);
        const { key, value } = action;
        if (_.isArray(key)) {
            newState[key[0]][key[1]] = value;
        } else {
            newState[key] = value;
        }
        return newState;
    }
    return action;
}

function Mission(props) {
    const userInfo: userInfo_Type = (JSON.parse(sessionStorage.getItem('userInfo')) as userInfo_Type);
    const initalState = {
        editData: {
            courseId: undefined,
            testpaperId: undefined,
            message: '',
            startTime: moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'),
            endTime: moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'),
            creatorId: userInfo.userId,
        },
        queryData: {
            missionId: undefined,
            courseId: undefined,
            creatorId: undefined
        },
        listData: [],
        dialogVisible: false,
        dialogTitle: '',
    }
    const [state, dispatch] = useReducer(reducer, initalState);

    useEffect(() => {
        gridProps.onFetchContent();
    }, [])

    const handleChange = (key, e) => {
        if (_.isArray(key)) {
            dispatch({key, value: e});
        } else {
            dispatch({key: [key, e.target.name], value: e.target.value});
        }
    }
    const handleDateChange = (key, date, dateString) => {
        dispatch({key: ['editData', key], value: dateString});
    }
    const edit = (line) => {
        const queryData = _.cloneDeep(state.queryData);
        const listData = _.cloneDeep(state.listData);
        const newState = _.cloneDeep(initalState);
        newState.queryData = queryData;
        newState.listData = listData;
        newState.dialogVisible = true;
        if (line.missionId) {
            newState.editData = line;
            newState.dialogTitle = '编辑';
        } else {
            newState.dialogTitle = '创建';
        }
        dispatch(newState);
    }
    const save = () => {
        const data = _.cloneDeep(state.editData);
        if (!data.courseId) {
            message.warn('请填写关联课程ID');
            return;
        }
        if (!data.testpaperId && !data.message) {
            message.warn('请至少填写试卷ID或通知内容其一');
            return;
        }
        data.startTime = moment(data.startTime).format('YYYY-MM-DD HH:mm:ss');
        data.endTime = moment(data.endTime).format('YYYY-MM-DD HH:mm:ss');
        Axios.post(`/api/mission/${data.missionId ? 'updateMission' : 'createMission'}`, data)
            .then(res => {
                if (res.data.success) {
                    message.success('创建成功');
                    gridProps.onFetchContent();
                } else {
                    message.error('创建失败')
                }
            })
    }
    const deleteMission = (missionId) => {
        Axios.post('/api/mission/deleteMission', {missionId})
            .then(res => {
                if (res.data.success) {
                    message.success('删除成功');
                    gridProps.onFetchContent();
                } else {
                    message.error('删除失败')
                }
            })
    }

    const gridProps: GridProps = {
        gridOptions: [
            { title: '任务ID', dataIndex: 'missionId', key: 'missionId' },
            { title: '课程ID', dataIndex: 'courseId', key: 'courseId' },
            { title: '试卷ID', dataIndex: 'testpaperId', key: 'testpaperId' },
            { title: '通知内容', dataIndex: 'message', key: 'message' },
            { title: '开始时间', dataIndex: 'startTime', key: 'startTime', render: (d) => moment(d).format('YYYY-MM-DD HH:mm:ss') },
            { title: '结束时间', dataIndex: 'endTime', key: 'endTime', render: d => moment(d).format('YYYY-MM-DD HH:mm:ss') },
            { title: '操作人', dataIndex: 'creatorId', key: 'creatorId' },
            { title: '操作', dataIndex: 'missionId', key: 'operation', render: (d, line) => [
                <Button onClick={edit.bind(this, line)}>编辑</Button>,
                <Popconfirm
                    okText='确定'
                    cancelText='取消'
                    onConfirm={deleteMission.bind(this, d)}
                    title='确定要删除该任务吗'
                >
                    <Button key={`mission${d}`}>删除</Button>
                </Popconfirm>
            ]}
        ],
        onFetchContent: (e) => {
            e && e.preventDefault();
            const queryData = _.cloneDeep(state.queryData);
            Axios.post('/api/mission/queryMissionList', queryData)
                .then(res => {
                    if (res.data.success) {
                        dispatch({key: 'dialogVisible', value: false});
                        dispatch({key: 'listData', value: res.data.data});
                        message.success('查询成功');
                    } else {
                        message.error('查询失败');
                    }
                })
        },
        searchRender: () => [
            <FormContorl type='number' layout={2} label='任务ID' key='search-missionId' name='missionId' value={state.queryData.missionId} />,
            <FormContorl type='number' layout={2} label='课程ID' key='search-courseId' name='courseId' value={state.queryData.courseId} />,
            <FormContorl type='number' layout={2} label='操作人' key='search-creatorId' name='creatorId' vakye={state.queryData.creatorId} />
        ],
        searchButtonExact: () => [<Button key='create' className='query-button' onClick={edit}>创建任务</Button>],
        handleSearchChange: handleChange.bind(this, 'queryData'),
        tableData: state.listData,
        dialogContentRender: () => (
            <Form onChange={handleChange.bind(this, 'editData')} onSubmit={() => {}}>
                <FormContorl type='number' label='课程ID' key='courseId' name='courseId' value={state.editData.courseId} />
                <FormContorl type='number' label='试卷ID' key='testpaperId' name='testpaperId' value={state.editData.testpaperId} placeholder='若为通知可选填' />
                <FormContorl type='text' label='通知内容' key='message' name='message' value={state.editData.message} placeholder='若为作业可选填' />
                <FormContorl type='date' label='开始时间' key='startTime' value={moment(state.editData.startTime)} onChange={handleDateChange.bind(this, 'startTime')} showTime />
                <FormContorl type='date' label='结束时间' key='endTime' value={moment(state.editData.endTime)} onChange={handleDateChange.bind(this, 'endTime')} showTime />
            </Form>
        ),
        onCloseDialog: () => dispatch({key: 'dialogVisible', value: false}),
        onDialogFormSubmit: save,
        dialogVisable: state.dialogVisible,
        dialogTitle: state.dialogTitle
    }

    return (
        <Grid { ...gridProps } />
    )
}

export { Mission };