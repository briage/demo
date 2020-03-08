import * as React from 'react';
import _ from 'lodash';
import { Input, Button } from 'antd';

const { useState } = React;

function MultifyInput(props) {
    const [state, setState] = useState({
        text: '',
        data: []
    });
    let editIndex = undefined, isEdit = false;
    const handleChange = e => {
        const newState = _.cloneDeep(state);
        newState.text = e.target.value;
        setState(newState);
    }
    const add = () => {
        const newState = _.cloneDeep(state);
        let { data, text } = newState;
        if (isEdit) {
            data[editIndex] = text;
            isEdit = false;
        }
        data.push(text);
        setState(newState);
        props.onChange(newState.data);
    }
    const edit = (index) => {
        const newState = _.cloneDeep(state);
        editIndex = index;
        isEdit = true;
        newState.text = newState.data[index];
        setState(newState);
    }
    const deleteItem = index => {
        const newState = _.cloneDeep(state);
        newState.data.splice(index, 1);
        setState(newState);
    }
    return (
        <div className='multify-input-wrapper'>
            {
                state.data.map((item, index) => (
                    <div className='multify-row'>
                        <div className='multify-label'>{item}</div>
                        <div className='multify-button'>
                            <Button onClick={edit.bind(this, index)}>编辑</Button>
                            <Button onClick={deleteItem.bind(this, index)}>删除</Button>
                        </div>
                    </div>
                ))
            }
            <div className='multify-row'>
                <div className='multify0label'>
                    <Input onChange={handleChange} value={state.text} key='multify-text' />
                </div>
                <div className='multify-button'>
                    <Button onClick={add}>添加</Button>
                </div>
            </div>
        </div>
    )
}

export { MultifyInput };