import * as React from 'react';
import _ from 'lodash';
import { Input, Button } from 'antd';

const { useState, useEffect } = React;

function MultifyInput(props) {
    const [state, setState] = useState({
        text: '',
        isEdit: false,
        editIndex: undefined
    });
    const handleChange = e => {
        const newState = _.cloneDeep(state);
        newState.text = e.target.value;
        setState(newState);
    }
    const add = () => {
        const newState = _.cloneDeep(state);
        let { text } = newState;
        props.value.push(text);
        newState.text = '';
        setState(newState);
        props.onChange(props.value);
    }
    const edit = (index, isEdit) => {
        const newState = _.cloneDeep(state);
        newState.editIndex = index;
        newState.isEdit = isEdit;
        setState(newState);
    }
    const handleEditChange = e => {
        props.value[state.editIndex] = e.target.value;
        props.onChange(props.value)
    }
    const deleteItem = index => {
        props.value.splice(index, 1);
        props.onChange(props.value);
    }
    const clear = () => {
        props.value = [];
        props.onChange(props.value);
    }
    return (
        <div className='multify-input-wrapper'>
            {
                props.value.map((item, index) => (
                    <div className='multify-row'>
                        <div className='multify-label'>
                            {
                                state.editIndex === index && state.isEdit ? (
                                    <Input.TextArea value={props.value[index]} onChange={handleEditChange} onBlur={edit.bind(this, undefined, false)} />
                                ) : item
                            }
                        </div>
                        <div className='multify-button'>
                            <Button onClick={edit.bind(this, index, true)}>编辑</Button>
                            <Button onClick={deleteItem.bind(this, index)}>删除</Button>
                        </div>
                    </div>
                ))
            }
            <div className='multify-row'>
                <div className='multify-label'>
                    <Input.TextArea onChange={handleChange} value={state.text} key='multify-text' />
                </div>
                <div className='multify-button'>
                    <Button onClick={add}>添加</Button>
                    <Button onClick={clear}>清空列表</Button>
                </div>
            </div>
        </div>
    )
}

export { MultifyInput };