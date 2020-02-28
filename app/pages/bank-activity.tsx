import * as React from 'react';
import _ from 'lodash';
// import { Form, Input, Button } from 'antd';
import { Form } from '../components/form-components/form';
import { MyInput as Input } from '../components/form-components/input';
import { FormContorl } from '../components/form-components/form-contorl';

const { useState } = React;

function BankActivity() {
    let [data, setData] = useState({
        name: '',
        age: 1,
        password: '',
        sex: '男',
        type: '0' 
    });
    // const SEX_OPTIONS = {
    //     0: '男',
    //     1: '女'
    // }
    const SEX_OPTIONS = ['男', '女'];
    const TYPE_OPTIONS = [{label: 'a', value: '0'}, {label: 'b', value: '1'}, {label: 'c', value: '2'}, {label: 'd', value: '3'}];
    const handleChange = e => {
        const { name, value } = e.target;
        const newData = _.cloneDeep(data);
        newData[name] = value;
        setData(newData);
    }
    return (
        <>
            <Form data={data} onSubmit={() => {}} onChange={handleChange} >
                <FormContorl type='password' layout={3} name='password' label='密码' value={data.password} key='password' />
                <FormContorl type='select' layout={3} name='sex' label='性别' value={data.sex} key='sex' options={SEX_OPTIONS} />
                <FormContorl type='text' layout={3} name='name' label='姓名' value={data.name} key='name' />
                <FormContorl type='number'layout={3} name='age' label='年龄' value={data.age} key='age' />
                <FormContorl type='radio' layout={3} name='type' label='类型' value={data.type} key='type' options={TYPE_OPTIONS} />
            </Form>
        </>
    )
}

export { BankActivity };