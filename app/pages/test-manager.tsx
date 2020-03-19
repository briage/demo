import * as React from 'react';
import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';
import { Grid, GridProps } from '../components/core/grid';
import { Form } from '../components/form-components/form';
import { FormContorl } from '../components/form-components/form-contorl';
import { Button, message, Icon, Popconfirm } from 'antd';
import { userInfo_Type } from '../../types';
import { State, editData_Type } from '../../types/test-manager';

const { useState, useEffect } = React;

const TYPE = {
    0: '全部',
    1: '单选',
    2: '多选',
    3: '作文',
    4: '听力',
    5: '听力附属题'
}
const DIFFCULTY = {
    0: '全部',
    1: '☆',
    2: '☆☆',
    3: '☆☆☆',
    4: '☆☆☆☆',
    5: '☆☆☆☆☆'
}

function TestManager(props) {
    const userInfo: userInfo_Type = (JSON.parse(sessionStorage.getItem('userInfo')) as userInfo_Type);
    const initalEditData: editData_Type = {
        title: '',
        type: 1,
        goal: undefined,
        answer: '',
        analysis: '',
        creatorId: userInfo ? userInfo.userId : undefined,
        createTime: 'time',
        answerNum: 1,
        labels: '',
        options: [],
        diffculty: 1,
        achivementRate: 100,
        usedNum: 0,
        linkProblemIds: '',
        linkListenId: undefined
    }
    const initalState: State = {
        queryData: {
            problemId: undefined,
            type: 0,
            creatorId: undefined,
            diffculty: 0
        },
        editData: initalEditData,
        dialogVisible: false,
        dialogTitle: '新建题目',
        loading: false,
        tableData: [],
        fileList: []
    }

    const [state, setState] = useState(initalState);

    useEffect(() => {
        gridProps.onFetchContent();
    }, [])

    const edit = (line) => {
        const newState = _.cloneDeep(state);
        if (line.problemId) {
            newState.editData = line;
            newState.fileList = line.type == 4 ? [{
                uid: 1,
                url: line.music_src,
                name: line.music_src.split('video/')[1],
                status: 'done'
            }] : [];
            newState.dialogTitle = '编辑题目';
        } else {
            newState.editData = initalEditData;
            newState.fileList = [];
            newState.dialogTitle = '新建题目';
        }
        newState.editData.options = _.isString(newState.editData.options) ? JSON.parse(newState.editData.options) : newState.editData.options;
        newState.dialogVisible = true;
        setState(newState);
    }
    const handleDelete = problemId => {
        axios.post('/api/test-manager/deleteTest', { problemId })
            .then(res => {
                if (res.data.success) {
                    message.success('删除成功');
                    gridProps.onFetchContent();
                } else {
                    message.error('删除失败');
                }
            })
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
    const handleUpdateChange = info => {
        const newState = _.cloneDeep(state);
        const fileInfo = _.cloneDeep(info);
        if (fileInfo.file.status === 'uploading') {
            newState.loading = true;
        } else if (fileInfo.file.status === 'done') {
            newState.editData.music_src = fileInfo.file.response.data;
            newState.loading = false;
            message.success('上传成功');
        }
        newState.fileList = [fileInfo.file];
        setState(newState);
    }
    const gridProps: GridProps = {
        tableData: state.tableData,
        gridOptions: [
            { key: 'problemId', dataIndex: 'problemId', title: '题目ID' },
            { key: 'type', dataIndex: 'type', title: '题型', render: d => TYPE[d] },
            { key: 'title', dataIndex: 'title', title: '题目' },
            { key: 'options', dataIndex: 'options', title: '选项', render: d => JSON.parse(d).map((item, index) => <p>{`${String.fromCharCode(65 + index)}:${item}`}</p>) },
            { key: 'answer', dataIndex: 'answer', title: '答案' },
            { key: 'analysis', dataIndex: 'analysis', title: '解析' },
            { key: 'goal', dataIndex: 'goal', title: '分值' },
            { key: 'diffculty', dataIndex: 'diffculty', title: '难度', render: d => DIFFCULTY[d] },
            { key: 'achivementRate', dataIndex: 'achivementRate', title: '正确率', render: d => `${d}%` },
            { key: 'usedNum', dataIndex: 'usedNum', title: '使用次数' },
            { key: 'creatorId', dataIndex: 'creatorId', title: '操作人' },
            { key: 'createTime', dataIndex: 'createTime', title: '操作时间', render: d => moment(d).format('YYYY-MM-DD HH:mm:ss') },
            { key: 'action', dataIndex: 'problemId', title: '操作', render: (d, line) => [
                <Button onClick={edit.bind(this, line)}>编辑</Button>,
                <Popconfirm
                    okText='删除'
                    cancelText='取消'
                    onConfirm={handleDelete.bind(this, d)}
                    title='确定要删除该题目吗'
                >
                    <Button>删除</Button>
                </Popconfirm>
            ] }
        ],
        onFetchContent: (e) => {
            e && e.preventDefault();
            const queryData = _.cloneDeep(state.queryData);
            if (!queryData.type) {
                delete queryData.type;
            }
            axios.post('/api/test-manager/queryTestList', queryData)
                .then(res => {
                    if (res.data.success) {
                        const newState = _.cloneDeep(state);
                        newState.dialogVisible = false;
                        newState.tableData = res.data.data;
                        message.success('查询成功');
                        setState(newState);
                    } else {
                        message.error('查询失败');
                    }
                })
        },
        searchButtonExact: () => [
            <Button onClick={edit} className='query-button'>新建题目</Button>
        ],
        searchRender: () => [
            <FormContorl layout={2} type='number' name='problemId' label='题目ID' value={state.queryData.problemId} key='problemId' />,
            <FormContorl layout={2} type='number' name='creatorId' label='创建人' value={state.queryData.creatorId} key='creatorId' />,
            <FormContorl layout={2} type='select' name='diffculty' label='难度' value={+state.queryData.diffculty} key='diffculty' options={DIFFCULTY} onChange={handleSelectChange.bind(this, ['queryData', 'diffculty'])} />,
            <FormContorl layout={2} type='select' onChange={handleSelectChange.bind(this, ['queryData', 'type'])} name='type' defaultValue='0' label='题型' value={state.queryData.type} key='type' options={TYPE} />
        ],
        handleSearchChange: handleChange.bind(this, 'queryData'),
        dialogContentRender: () => (
            <Form onChange={handleChange.bind(this, 'editData')} onSubmit={() => {}} >
                <FormContorl type='textarea' key='title' name='title' value={state.editData.title} label='题目' />
                <FormContorl type='select' key='type' name='type' value={state.editData.type} label='题型' options={TYPE} defaultValue={1} onChange={handleSelectChange.bind(this, ['editData', 'type'])} />
                { (state.editData.type != 3 && state.editData.type !== 4) && <FormContorl type='multify-input' key='options' name='options' value={state.editData.options} label='选项' onChange={handleSelectChange.bind(this, ['editData', 'options'])} /> }
                { state.editData.type == 2 && <FormContorl type='number' key='answerNum' name='answerNum' value={state.editData.answerNum} label='答案数量' /> }
                { state.editData.type == 4 && [<FormContorl type='upload' key='music_src' name='music_src' showUploadList={true} fileList={state.fileList} onChange={handleUpdateChange} label='听力音频上传'>   
                    {
                        <Button>
                            {state.loading ? <Icon type='loading' /> : <Icon type='plus' />} 上传
                        </Button>
                    }
                    </FormContorl>,
                    <FormContorl type='text' name='linkProblemIds' label='附属题ID' value={state.editData.linkProblemIds} key='linkProblemIds' />]    
                }{
                    state.editData.type == 5 && <FormContorl type='number' label='所属听力题ID' value={state.editData.linkListenId} key='linkListenId' name='linkListenId' />
                }
                <FormContorl type='text' key='answer' name='answer' value={state.editData.answer} label='答案' placeholder='多个答案以;隔开' />
                <FormContorl type='textarea' key='analysis' name='analysis' value={state.editData.analysis} label='解析' />
                <FormContorl type='select' key='diffculty' name='diffculty' defaultValue={1} options={DIFFCULTY} value={+state.editData.diffculty} onChange={handleSelectChange.bind(this, ['editData', 'diffculty'])} label='难度' />
                <FormContorl type='text' key='labels' name='labels' value={state.editData.labels} label='标签' />
                <FormContorl type='number' key='goal' name='goal' value={state.editData.goal} label='分值' />
            </Form>
        ),
        onDialogFormSubmit: () => {
            const data = _.cloneDeep(state.editData);
            data.creatorId = userInfo && userInfo.userId;
            data.createTime = moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss');
            const isEdit = !!data.problemId;
            if (data.type != 5) {
                delete data.linkListenId;
            } 
            if (data.type != 4) {
                delete data.linkProblemIds;
            }
            for (let item in data) {
                if (item !== 'music_src' && item !== 'usedNum' && !data[item]) {
                    message.warn('请输入完整信息');
                    return;
                }
                if (data.type == 4) {
                    if (!data.music_src) {
                        message.warn('听力题需上传听力音频文件');
                        return;
                    }
                }
            }
            delete data[''];
            data.options = (JSON.stringify(data.options));
            axios.post(`/api/test-manager/${isEdit ? 'updateTest' : 'createTest'}`, data)
                .then(res => {
                    if (res.data.success) {
                        message.success(`保存成功`);
                        gridProps.onFetchContent();
                    } else {
                        message.error('保存失败');
                    }
                }).catch(err => {
                    console.error(err);
                })
        },
        onCloseDialog: () => {
            const newState = _.cloneDeep(state);
            newState.dialogVisible = false;
            newState.editData = initalEditData;
            setState(newState);
        },
        dialogTitle: state.dialogTitle,
        dialogVisable: state.dialogVisible,
        dialogWidth: 750
    }
    return (
        <Grid { ...gridProps } />
    )
}

export { TestManager };