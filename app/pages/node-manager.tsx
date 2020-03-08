import * as React from 'react';
import _ from 'lodash';
import axios from 'axios';
import { Grid, GridProps } from '../components/core/grid';
import { Form } from '../components/form-components/form';
import { FormContorl } from '../components/form-components/form-contorl';
import { Button, message, Popconfirm, Upload, Icon } from 'antd';
import moment from 'moment';

interface userInfo_Type {
    userName: string,
    userId: number
}
interface queryData_Type {
    subcourseId: number,
    subcourseName: string,
    courseId: number,
    creatorId: number
}
interface editData_type {
    subcourseName: string,
    courseId: number,
    video_src: string,
    index: number,
    teacherId: number,
    creatorId?: number,
    createTime?: string,
    subcourseId?: number
}
interface State {
    queryData: queryData_Type,
    editData: editData_type,
    tableData: any[],
    dialogTitle: string,
    dialogVisible: boolean,
    loading: boolean
}

const { useState, useEffect } = React;

function NodeManager(props) {
    useEffect(() => {
        gridProps.onFetchContent();
    }, [])
    const userInfo: userInfo_Type = (JSON.parse(sessionStorage.getItem('userInfo')) as userInfo_Type);
    const initalEditData =  {
        subcourseName: '',
        courseId: undefined,
        video_src: '',
        index: undefined,
        teacherId: undefined,
        createTime: 'time',
        creatorId: userInfo.userId
    }
    const initalState: State = {
        queryData: {
            subcourseId: undefined,
            subcourseName: '',
            creatorId: undefined,
            courseId: undefined
        },
        editData: initalEditData,
        tableData: [],
        dialogTitle: '创建课时',
        dialogVisible: false,
        loading: false
    }
    const [state, setState] = useState(initalState);
    const handleDialogChange = async(e) => {
        const newState = _.cloneDeep(state);
        newState.editData[e.target.name] = e.target.value;
        setState(newState);
    }
    const edit = (line) => {
        const newState = _.cloneDeep(state);
        if (line && line.courseId) {
            for (let item in line) {
                if (!line[item]) {
                    delete line[item];
                }
            }
            newState.dialogTitle = '编辑课时';
            newState.editData = line;
        } else {
            newState.dialogTitle = '创建课时';
        }
        newState.dialogVisible = true;
        setState(newState);
    }
    const deleteCourse = (id) => {
        axios.post('/api/node-manage/deleteNode', {subcourseId: id})
            .then(res => {
                if (res.data.success) {
                    message.success('删除成功');
                    gridProps.onFetchContent();
                } else {
                    message.error('删除失败');
                }
            })
    }
    const handleUploadChange = (info) => {
        const newState = _.cloneDeep(state);
        if (info.file.status === 'uploading') {
            newState.loading = true;
            setState(newState);
            return;
        } else if (info.file.status === 'done') {
            newState.editData.video_src = info.file.response.data;
            newState.loading = false;
            message.success('上传成功')
            setState(newState);
        }
    }
    const gridProps: GridProps = {
        gridOptions: [
            { key: 'subcourseId', dataIndex: 'subcourseId', title: '课时ID' },
            { key: 'subcourseName', dataIndex: 'subcourseName', title: '课时名称' },
            { key: 'video_src', dataIndex: 'video_src', title: '视频地址', render: d => <a href={d}>{d}</a> },
            { key: 'courseId', dataIndex: 'courseId', title: '隶属课程ID' },
            { key: 'creatorId', dataIndex: 'creatorId', title: '创建人Id' },
            { key: 'createTime', dataIndex: 'createTime', title: '创建时间', render: d => moment(d).format('YYYY-HH-DD HH:mm:ss') },
            { key: 'action', dataIndex: 'subcourseId', title: '操作', render: (d, line) => [
                <Button key={`edit${d}`} onClick={edit.bind(this, line)}>编辑</Button>,
                <Popconfirm
                    okText='确定'
                    cancelText='取消'
                    onConfirm={deleteCourse.bind(this, d)}
                    title='确定要删除该课时吗'
                >
                    <Button key={`delete${d}`}>删除</Button>
                </Popconfirm>
            ] }
        ],
        tableData: state.tableData,
        searchRender: () => [
            <FormContorl layout={2} type='number' name='subcourseId' label='课时ID' value={state.queryData.subcourseId} key='subcourseId' />,
            <FormContorl layout={2} type='text' name='subcourseName' label='课时名称' value={state.queryData.subcourseName} key='NodeName' />,
            <FormContorl layout={2} type='number' name='courseId' label='隶属课程ID' value={state.queryData.courseId} key='courseId' />,
            <FormContorl layout={2} type='number' name='creatorId' label='创建人' value={state.queryData.creatorId} key='creatorId' />
        ],
        onFetchContent: (e?: React.FormEvent) => {
            e && e.preventDefault();
            axios.post('/api/node-manage/queryNodeList', state.queryData)
                .then(res => {
                    if (res.data.success) {
                        const newState = _.cloneDeep(state);
                        newState.tableData = res.data.data;
                        setState(newState);
                    } else {
                        message.error('查询失败')
                    }
                })
        },
        searchButtonExact: () => [
            <Button key='create' className='query-button' onClick={edit}>创建课时</Button>
        ],
        handleSearchChange: e => {
            const newState = _.cloneDeep(state)
            newState.queryData[e.target.name] = e.target.value;
            setState(newState);
        },
        onCloseDialog: () => {
            const newState = _.cloneDeep(state);
            newState.dialogVisible = false;
            newState.editData = initalEditData;
            setState(newState);
        },
        onDialogFormSubmit: () => {
            let data = _.cloneDeep(state.editData);
            for(let item in data) {
                if (!data[item]) {
                    message.warn('请填写完整')
                    return;
                }
            }
            delete data[''];
            data.createTime = moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss');
            axios.post(`/api/node-manage/${data.subcourseId ? 'updateNode' : 'createNode'}`, data)
                .then(res => {
                    if (res.data.success) {
                        message.success('操作成功');
                        gridProps.onFetchContent();
                    } else {
                        message.error('操作失败')
                    }
                })
                .catch(err => {
                    console.error(err)
                })
        },
        dialogContentRender: () => (
            <Form onChange={handleDialogChange} onSubmit={() => {}}>
                <FormContorl type='text' name='subcourseName' label='课时名称' value={state.editData.subcourseName} key='subcourseName' />
                <FormContorl type='number' name='courseId' label='隶属课程' value={state.editData.courseId} key='courseId' />
                <FormContorl type='number' name='teacherId' label='授课教师' value={state.editData.teacherId} key='teacherId' />
                <FormContorl type='upload' label='上传视频' key='video_src' action='/api/upload' onChange={handleUploadChange} listType='picture' name='video_src' showUploadList={false} >
                    <Button>
                        {state.loading ? <Icon type='loading' /> : <Icon type='plus' />}上传
                    </Button>
                </FormContorl>
                <FormContorl type='number' name='index' label='第几节' value={state.editData.index} key='index' />
            </Form>
        ),
        dialogVisable: state.dialogVisible,
        dialogTitle: state.dialogTitle
    }
    return (
        <>
            <Grid { ...gridProps } />
        </>
    )
}

export { NodeManager };