import * as React from 'react';

function Live(props) {
    return (
        <iframe style={{border: '0'}} src='https://videocall.agora.io' width='100%' height='100%' />
    )
}

export { Live }