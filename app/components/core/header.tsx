import * as React from 'react';

function Header(props) {
    return (
        <>
            <div className='header-title'>来必会英语平台Admin</div>
            <div className='header-userInfo'>{ `hi，${props.userInfo.userName}` }</div>
        </>
    )
}

export {
    Header
}