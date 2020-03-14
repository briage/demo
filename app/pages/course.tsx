import * as React from 'react';
import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';
import { Grid, GridOptionsItem, GridProps } from '../components/core/grid';
import { Form } from '../components/form-components/form';
import { FormContorl } from '../components/form-components/form-contorl';
import { Button, message, Popconfirm, Upload, Icon } from 'antd';
import { handleUserInfo } from '../util';
import { userInfo_Type } from '../../types';
import { State } from '../../types/course';

const { useState, useEffect } = React;
  
function Course(props) {
    const userInfo: userInfo_Type = (JSON.parse(sessionStorage.getItem('userInfo')) as userInfo_Type);
    const initalState: State = {
        tableData: [],
        editData: {
            courseName: '',
            labels: '',
            teacherIds: '',
            money: 0,
            businessId: undefined,
            creatorId: userInfo && userInfo.userId,
            createTime: moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'),
            image_src: '',
            managerId: undefined,
            introduceInfo: ''
        },
        queryData: {
            courseId: undefined,
            courseName: '',
            creatorId: undefined
        },
        dialogVisiabel: false,
        dialogTitle: '创建课程',
        loading: false
    }
    useEffect(() => {
        GridProps.onFetchContent()
    }, [])
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
            newState.dialogTitle = '编辑课程';
            newState.editData = line;
        } else {
            newState.editData = initalState.editData;
            newState.dialogTitle = '创建课程';
        }
        newState.dialogVisiabel = true;
        setState(newState);
    }
    const deleteCourse = (id) => {
        axios.post('/api/course/deleteCourse', {courseId: id})
            .then(res => {
                if (res.data.success) {
                    message.success('删除成功');
                    GridProps.onFetchContent();
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
            newState.editData.image_src = info.file.response.data;
            newState.loading = false;
            message.success('上传成功')
            setState(newState);
        }
    }
    const GridProps: GridProps = {
        gridOptions: [
            { key: 'courseId', dataIndex: 'courseId', title: '课程ID' },
            { key: 'courseName', dataIndex: 'courseName', title: '课程名称' },
            { key: 'labels', dataIndex: 'labels', title: '课程标签' },
            { key: 'money', dataIndex: 'money', title: '售价', render: (d: number) => d ? d : '免费' },
            { key: 'studentIds', dataIndex: 'studentIds', title: '报名学生ID' },
            { key: 'businesser', dataIndex: 'businessId', title: '商家ID' },
            { key: 'managerId', dataIndex:'managerId', title:'班主任ID' },
            { key: 'creator', dataIndex: 'creatorId', title: '创建人' },
            { key: 'createTime', dataIndex: 'createTime', title: '创建时间', render: (d: Date) => moment(d).format('YYYY-MM-DD HH:mm:ss') },
            { key: 'actions', dataIndex: 'courseId', title: '操作', render: (d, line) => [
                <Button key={`edit${d}`} onClick={edit.bind(this, line)}>编辑</Button>,
                <Popconfirm
                    okText='确定'
                    cancelText='取消'
                    onConfirm={deleteCourse.bind(this, d)}
                    title='确定要删除该课程吗'
                >
                    <Button key={`delete${d}`}>删除</Button>
                </Popconfirm>
            ] }
        ],
        tableData: state.tableData,
        searchRender: () => [
            <FormContorl layout={2} type='number' name='courseId' label='课程ID' value={state.queryData.courseId} key='courseId' />,
            <FormContorl layout={2} type='text' name='courseName' label='课程名称' value={state.queryData.courseName} key='courseName' />,
            <FormContorl layout={2} type='number' name='creatorId' label='创建人' value={state.queryData.creatorId} key='creatorId' />
        ],
        onFetchContent: (e?: React.FormEvent) => {
            e && e.preventDefault();
            axios.post('/api/course/queryCourseList', state.queryData)
                .then(res => {
                    if (res.data.success) {
                        const newState = _.cloneDeep(state);
                        newState.dialogVisiabel = false;
                        newState.tableData = res.data.data;
                        setState(newState);
                    } else {
                        message.error('查询失败')
                    }
                })
        },
        searchButtonExact: () => [
            <Button key='create' className='query-button' onClick={edit}>创建课程</Button>
        ],
        handleSearchChange: e => {
            const newState = _.cloneDeep(state)
            newState.queryData[e.target.name] = e.target.value;
            setState(newState);
        },
        onCloseDialog: () => {
            const newState = _.cloneDeep(state);
            newState.dialogVisiabel = false;
            setState(newState);
        },
        onDialogFormSubmit: () => {
            let data = _.cloneDeep(state.editData);
            for(let item in data) {
                if (item !== 'money' && !data[item]) {
                    message.warn('请填写完整')
                    return;
                }
                if (data.money < 0) {
                    message.warn('售价不得小于0');
                    return;
                }
            }
            delete data[''];
            data.creatorId = userInfo && userInfo.userId;
            data.createTime = moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss');
            axios.post(`/api/course/${data.courseId ? 'updateCourse' : 'createCourse'}`, data)
                .then(res => {
                    if (res.data.success) {
                        message.success('操作成功');
                        GridProps.onFetchContent();
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
                <FormContorl type='text' name='courseName' label='课程名称' value={state.editData.courseName} key='courseName' />
                <FormContorl type='text' name='labels' label='课程标签' value={state.editData.labels} key='labels' />
                <FormContorl type='text' name='teacherIds' label='授课教师' value={state.editData.teacherIds} key='teacherIds' />
                <FormContorl type='upload' label='上传图片' key='image_src' action='/api/upload' onChange={handleUploadChange} listType='picture-card' name='image_src' showUploadList={false} >
                    {state.editData.image_src ? <img src={state.editData.image_src} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </FormContorl>
                <FormContorl type='number' name='money' label='售价' value={state.editData.money} key='money' />
                <FormContorl type='number' name='businessId' label='商家ID' value={state.editData.businessId} key='businessId' />
                <FormContorl type='number' name='managerId' label='班主任ID' value={state.editData.managerId} key='managerId' />
                <FormContorl type='textarea' name='introduceInfo' label='课程简介' value={state.editData.introduceInfo} key='introduceInfo' />
            </Form>
        ),
        dialogVisable: state.dialogVisiabel,
        dialogTitle: state.dialogTitle
    }
    const uploadButton = (
        <div>
        {state.loading ? <Icon type='loading' /> : <Icon type='plus' />}
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
        <>
            <Grid { ...GridProps } />
        </>
    )
}

export { Course };