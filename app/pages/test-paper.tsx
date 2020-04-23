import * as React from 'react';
import _ from 'lodash';
import axios from 'axios';
import { Form } from '../components/form-components/form';
import { FormContorl } from '../components/form-components/form-contorl';
import { Grid, GridProps } from '../components/core/grid';
import moment from 'moment';
import { Button, message } from 'antd';
import { userInfo_Type } from '../../types';
import { editData_Type, State, queryData_Type } from '../../types/test-paper'

const { useReducer, useEffect } = React;

const DIFFCULTY = {
    0: '全部',
    1: '☆',
    2: '☆☆',
    3: '☆☆☆',
    4: '☆☆☆☆',
    5: '☆☆☆☆☆'
};
const TYPE = [{ label: '手动组卷', value: 0 }, { label: '一键组卷', value: 1 }];

function reducer(state: State, action) {
    const newState = _.cloneDeep(state);
    switch (action.type) {
        case 'queryData': 
            newState.queryData[action.dataName] = action.data;
            return newState;
        case 'editData':
            newState.editData[action.dataName] = action.data;
            return newState;
        default:
            newState[action.dataName] = action.data;
            return newState;
    }
}

function TestPaper(props) {
    const userInfo: userInfo_Type = (JSON.parse(sessionStorage.getItem('userInfo')) as userInfo_Type);

    const initalEditData: editData_Type = {
        testpaperName: '',
        courseId: undefined,
        diffculty: 1,
        labels: '',
        usedCount: 0,
        type: 1,
        teacherId: undefined,
        isTest: 0,
        creatorId: userInfo && userInfo.userId,
        createTime: 'time'
    }
    const initalQueryData: queryData_Type = {
        testpaperId: undefined,
        testpaperName: '',
        creatorId: undefined,
        diffculty: 0,
        labels: ''
    }
    const initalState: State = {
        queryData: initalQueryData,
        editData: initalEditData,
        tableData: [],
        dialogTitle: '',
        dialogVisible: false
    }

    const [state, dispatch] = useReducer(reducer, initalState);

    useEffect(() => {
        gridProps.onFetchContent();
    }, [])
    function handleChange(type, e) {
        const action = {
            type: '',
            dataName: '',
            data: ''
        };
        if (_.isArray(type)) {
            action.type = type[0];
            action.dataName = type[1];
            action.data = e;
        } else {
            action.type = type;
            action.dataName = e.target.name;
            action.data = e.target.value;
        }
        dispatch(action);
    }
    function edit(line) {
        let dialogTitle = '';
        let editData = {};
        if (line && line.testpaperId) {
            editData = line;
            line.type = 0;
            dialogTitle = '编辑试卷';
        } else {
            dialogTitle = '新建试卷';
            editData = initalEditData;
        }
        dispatch({
            data: dialogTitle,
            dataName: 'dialogTitle'
        });
        dispatch({
            data: editData,
            dataName: 'editData'
        });
        dispatch({
            data: true,
            dataName: 'dialogVisible'
        });
    }
    function deleteTestPaper(testpaperId) {
        axios.post('/api/test-paper/deleteTestPaper', {testpaperId})
            .then(res => {
                if (res.data.success) {
                    message.success('删除成功');
                    gridProps.onFetchContent();
                }
            })
            .catch(err => {
                message.error(err);
                console.error(err);
            })
    } 

    const gridProps: GridProps = {
        gridOptions: [
            { key: 'testpaperId', dataIndex: 'testpaperId', title: '试卷ID' },
            { key: 'testpaperName', dataIndex: 'testpaperName', title: '试卷名称' },
            { key: 'courseId', dataIndex: 'courseId', title: '关联课程ID' },
            { key: 'diffculty', dataIndex: 'diffculty', title: '难度' },
            { key: 'labels', dataIndex: 'labels', title: '标签' },
            { key: 'usedCount', dataIndex: 'usedCount', title: '使用次数' },
            { key: 'onlyChoiceIds', dataIndex: 'onlyChoiceIds', title: '单选题ID' },
            { key: 'multifyChoiceIds', dataIndex: 'multifyChoiceIds', title: '多选题ID' },
            { key: 'listenIds', dataIndex: 'listenIds', title: '听力题ID' },
            { key: 'writeIds', dataIndex: 'writeIds', title: '写作题ID' },
            { key: 'creatorId', dataIndex: 'creatorId', title: '操作人' },
            { key: 'createTime', dataIndex: 'createTime', title: '操作时间', render: d => moment(d).format('YYYY-MM-DD HH:mm:ss') },
            { key: 'action', dataIndex: 'testpaperId', title: '操作', render: (d, line) => [
                <Button onClick={edit.bind(this, line)}>编辑</Button>,
                <Button onClick={deleteTestPaper.bind(this, d)}>删除</Button>
            ] }
        ],
        searchRender: () => [
            <FormContorl layout={3} type='number' label='试卷ID' name='testpaperId' key='testpaperId' value={state.queryData.testpaperId} />,
            <FormContorl layout={3} type='text' label='试卷名称' name='testpaperName' key='testpaperName' value={state.queryData.testpaperName} />,
            <FormContorl layout={3} type='number' label='操作人' name='creatorId' key='creatorId' value={state.queryData.creatorId} />,
            <FormContorl layout={3} type='text' label='标签' name='labels' key='labels' value={state.queryData.labels} />,
            <FormContorl layout={3} type='select' label='难度' onChange={handleChange.bind(this, ['queryData', 'diffculty'])} key='diffculty' value={state.queryData.diffculty} options={DIFFCULTY} />
        ],
        handleSearchChange: handleChange.bind(this, 'queryData'),
        searchButtonExact: () => [
            <Button className='query-button' onClick={edit} >组卷</Button>
        ],
        tableData: state.tableData,
        onFetchContent: (e?: React.FormEvent) => {
            e && e.preventDefault();
            axios.post('/api/test-paper/queryTestPaper', state.queryData)
                .then(res => {
                    if (res.data.success) {
                        dispatch({
                            data: res.data.data,
                            dataName: 'tableData'
                        });
                        message.success('查询成功');
                    }
                })
                .catch(err =>{
                    console.error(err);
                    message.error(err);
                })
        },
        dialogContentRender: () => (
            <Form onChange={handleChange.bind(this, 'editData')} onSubmit={() => {}} >
                <FormContorl type='text' name='testpaperName' key='testpaperName' value={state.editData.testpaperName} label='试卷名称' />
                <FormContorl type='number' name='courseId' key='courseId' value={state.editData.courseId} label='关联课程ID' placeholder='若无关联课程可不填' />
                <FormContorl type='select' name='diffculty' key='diffculty' value={state.editData.diffculty} label='难度' options={DIFFCULTY} onChange={handleChange.bind(this, ['editData', 'diffculty'])} />
                <FormContorl type='text' name='labels' key='labels' value={state.editData.labels} label='标签' />
                <FormContorl type='radio' name='isTest' key='isTest' label='是否为评测卷' value={+state.editData.isTest} options={[{label: '否', value: 0}, {label: '是', value: 1}]} />
                <FormContorl type='radio' name='type' label='组卷方式' key='type' value={+state.editData.type} options={TYPE} />
                { +state.editData.type === 0 && [
                    <FormContorl type='textarea' name='onlyChoiceIds' key='onlyChoiceIds' label='单选题ID' value={state.editData.onlyChoiceIds} placeholder='若无该题型可不填id之间以;隔开' />,
                    <FormContorl type='textarea' name='multifyChoiceIds' key='multifyChoiceIds' label='多选题ID' value={state.editData.multifyChoiceIds} placeholder='若无该题型可不填id之间以;隔开' />,
                    <FormContorl type='textarea' name='listenIds' key='listenIds' label='听力题ID' value={state.editData.listenIds} placeholder='若无该题型可不填id之间以;隔开' />,
                    <FormContorl type='textarea' name='writeIds' key='writeIds' label='写作题ID' value={state.editData.writeIds} placeholder='若无该题型可不填id之间以;隔开' />,
                ] }
                { +state.editData.type === 1  && [
                    <FormContorl type='number' name='onlyChoiceNum' key='onlyChoiceNum' label='单选题数量' min={0} value={state.editData.onlyChoiceNum} />,
                    <FormContorl type='number' name='multifyChoiceNum' key='multifyChoiceNum' label='多选题数量' min={0} value={state.editData.multifyChoiceNum} />,
                    <FormContorl type='number' name='listenNum' key='listenNum' label='听力题数量' min={0} value={state.editData.listenNum} />,
                    <FormContorl type='number' name='writeNum' key='writeNum' label='写作题数量' min={0} value={state.editData.writeNum} />,
                ] }
            </Form>
        ),
        onDialogFormSubmit: () => {
            const data = _.cloneDeep(state.editData);
            const checkList = ['testpaperName', 'labels'];
            let checked = true;
            checkList.forEach(item => {
                if (!data[item]) {
                    message.warn('试卷名称或标签未填写');
                    checked = false;
                }
            });
            if (!checked) {
                return;
            }
            if (!+data.type) {
                if (!data.onlyChoiceIds && !data.multifyChoiceIds && !data.listenIds && !data.writeIds) {
                    message.warn('不可创建无题试卷');
                    return;
                }
            } else {
                if (!data.onlyChoiceNum && !data.multifyChoiceNum && !data.listenNum && !data.writeNum) {
                    message.warn('不可创建无题试卷');
                    return;
                }
            }
            data.createTime = moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss');
            data.creatorId = userInfo && userInfo.userId;
            axios.post(`/api/test-paper/${data.testpaperId ? 'updateTestPaper' : 'createTestPaper'}`, data)
                .then(res => {
                    if (res.data.success) {
                        message.success('保存成功');
                        gridProps.onFetchContent();
                        gridProps.onCloseDialog();
                    } else {
                        message.error('保存失败');
                    }
                })
                .catch(err => {
                    console.error(err);
                    message.error(err);
                })
        },
        onCloseDialog: dispatch.bind(this, {data: false, dataName: 'dialogVisible'}),
        dialogTitle: state.dialogTitle,
        dialogVisable: state.dialogVisible
    }
    return (
        <Grid key='testpaper' { ...gridProps } /> 
    )
}

export { TestPaper };