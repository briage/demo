import * as React from 'react';
import moment from 'moment';

const { useState } = React;

function Index(props) {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    const [time, setTime] = useState(moment(new Date().getTime()).format('HH:mm:ss'));
    setTimeout(() => {
        setTime(moment(new Date().getTime()).format('HH:mm:ss'));
    }, 1000);
    return (
        <>
            <div className='login-wrapper'>
                <h1>
                    Hello,{ userInfo && userInfo.userName }<br/>
                    { time }
                </h1>
                
            </div>
        </>
    )
}

export { Index };