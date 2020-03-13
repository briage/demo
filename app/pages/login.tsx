import * as React from 'react';
import { Form } from '../components/form-components/form';
import { FormContorl } from '../components/form-components/form-contorl';
import { Input, message } from 'antd';
import _ from 'lodash';
import axios from 'axios';

const { useState } = React;

interface State {
    phone: string,
    password: string
}

const initialState: State = {
    phone: '',
    password: ''
};

function Login(props) {
    const [state, setState] = useState(initialState);
    function handleChange(e) {
        const newState = _.cloneDeep(state);
        newState[e.target.name] = e.target.value;
        setState(newState);
    }
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        axios.post('/api/login', state)
        .then(res => {
            let { data } = res;
            if (data.success) {
                location.href = document.referrer ? document.referrer : '/';
            } else {
                message.error('用户名或密码错误');
            }
        })
        .catch(err => {
            console.error(err);
        })
    }
    return (
        <div className='login-wrapper'>
            <div style={{fontSize: '1.5em'}}>来必会平台登录</div>
            <Form onChange={handleChange} onSubmit={handleSubmit}>
                <FormContorl type='text' value={state.phone} name='phone' label='手机号' key='phone' />
                <FormContorl type='password' value={state.password} name='password' label='密码' key='password' />
                <Input type='submit' style={{width: 100, margin: '0 auto'}} value="登录" />
            </Form>
        </div>
    )
}

export { Login };