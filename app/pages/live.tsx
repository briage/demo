import * as React from 'react';
import _ from 'lodash';
import { Button } from 'antd';
import axios from 'axios';

const { useReducer, useEffect } = React;

function reducer(state, action) {
    if (action.key) {
        const newState = _.cloneDeep(state);
        newState[action.key] = action.value;
        return newState;
    }
    return action;
}

function Live(props) {
    const [state, dispatch] = useReducer(reducer, {
        src: '',
        media: ''
    })
    const startLive = () => {
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then(stream => {
            console.log(stream)
            const data = stream
            const websocket = new WebSocket('ws://localhost:8888');
            const mediaSource = new MediaSource();
            
            document.querySelector('video').srcObject = data;
        })
        
    
    }
    useEffect(() => {
        // const timer = setTimeout(() => {
            
        // }, 1000);
    }, [])
    return (
        <>
            <video width={'100%'} height={400} controls autoPlay />
            
            <Button onClick={startLive}>开始直播</Button>
        </>
    )
}

export { Live };