import * as React from 'react';
import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';
import { Grid, GridProps } from '../components/core/grid';
import { Form } from '../components/form-components/form';
import { FormContorl } from '../components/form-components/form-contorl';
import { Button, message } from 'antd';

const { useState, useEffect } = React;

interface editData_Type {
    title: string,
    type: number,
    goal: number,
    options?: string[],
    answer: string | string[],
    analysis: string,
    music_src?: string,
    creatorId: number,
    createTime: string,
    problemId?: number,
    answerNum: number
}
interface State {
    queryData: {
        problemId: number,
        creatorId: number,
        type: number,
    },
    editData: editData_Type,
    tableData: any[],
    dialogVisible: boolean,
    dialogTitle: string,
    loading: boolean
}
interface userInfo_Type {
    userName: string,
    userId: number
}
const TYPE = {
    1: '单选',
    2: '多选',
    3: '作文',
    4: '听力'
}
const userInfo: userInfo_Type = (JSON.parse(sessionStorage.getItem('userInfo')) as userInfo_Type);
const initalEditData = {
    title: '',
    type: undefined,
    goal: undefined,
    answer: '',
    analysis: '',
    creatorId: userInfo.userId,
    createTime: 'time',
    answerNum: 1
}
const initalState: State = {
    queryData: {
        problemId: undefined,
        type: undefined,
        creatorId: undefined
    },
    editData: initalEditData,
    dialogVisible: false,
    dialogTitle: '新建题目',
    loading: false,
    tableData: []
}

function TestManager(props) {

    const [state, setState] = useState(initalState);

    const edit = (line) => {
        const newState = _.cloneDeep(state);
        newState.editData = line.id ? line : initalEditData;
        newState.dialogVisible = true;
        setState(newState);
    }
    const handleDelete = id => {
        
    }
    const handleChange = (key, e) => {
        const newState = _.cloneDeep(state);
        newState[key][e.target.name] = e.target.value;
        setState(newState);
    }
    const handleSelectChange = (key: string[], value) => {
        const newState = _.cloneDeep(state);
        newState[key[0]][key[1]] = value;
        setState(newState);
    }
    const gridProps: GridProps = {
        tableData: state.tableData,
        gridOptions: [
            { key: 'problemId', dataIndex: 'problemId', title: '题目ID' },
            { key: 'type', dataIndex: 'type', title: '题型', render: d => TYPE[d] },
            { key: 'title', dataIndex: 'title', title: '题目' },
            { key: 'options', dataIndex: 'options', title: '选项', render: d => d.map(item => <p>{item}</p>) },
            { key: 'answer', dataIndex: 'answer', title: '答案' },
            { key: 'analysis', dataIndex: 'analysis', title: '解析' },
            { key: 'goal', dataIndex: 'goal', title: '分值' },
            { key: 'creatorId', dataIndex: 'creatorId', title: '操作人' },
            { key: 'createTime', dataIndex: 'createTime', title: '操作时间' },
            { key: 'action', dataIndex: 'problemId', title: '操作', render: (d, record) => [
                <Button onClick={edit.bind(this, record)}>编辑</Button>,
                <Button onClick={handleDelete.bind(this, d)}>删除</Button>
            ] }
        ],
        onFetchContent: () => {

        },
        searchButtonExact: () => [
            <Button onClick={edit} className='query-button'>新建题目</Button>
        ],
        searchRender: () => [
            <FormContorl layout={3} type='number' name='problemId' label='题目ID' value={state.queryData.problemId} key='problemId' />,
            <FormContorl layout={3} type='number' name='creatorId' label='创建人' value={state.queryData.creatorId} key='creatorId' />,
            <FormContorl layout={3} type='select' onChange={handleSelectChange.bind(this, ['queryData', 'type'])} name='type' label='题型' value={state.queryData.type} key='type' options={TYPE} />
        ],
        handleSearchChange: handleChange.bind(this, 'queryData'),
        dialogContentRender: () => (
            <Form onChange={handleChange.bind(this, 'editData')} onSubmit={() => {}} >
                <FormContorl type='textarea' name='title' key='title' value={state.editData.title} label='题目' />
                <FormContorl type='select' name='type' key='type' value={state.editData.type} label='题型' options={TYPE} onChange={handleSelectChange.bind(this, ['editData', 'type'])} />
                <FormContorl type='' />
            </Form>
        ),
        onDialogFormSubmit: () => {
            const data = _.cloneDeep(state.editData);
            for (let item in data) {
                if (!data[item]) {
                    message.warn('请输入完整信息');
                    return;
                }
            }
        delete data[''];
        },
        onCloseDialog: () => {
            const newState = _.cloneDeep(state);
            newState.dialogVisible = false;
            setState(newState);
        },
        dialogTitle: state.dialogTitle,
        dialogVisable: state.dialogVisible
    }
    return (
        <>
            <Grid { ...gridProps } />
        </>
    )
}

export { TestManager };