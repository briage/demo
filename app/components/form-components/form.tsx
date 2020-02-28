import * as React from 'react';
import _ from 'lodash';
// import { Form } from 'antd';

interface FormProps {
    data: object,
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    onChange: (event: React.FormEvent<HTMLFormElement>) => void,
    children: React.ReactNodeArray | React.ReactNode,
    layout?: number
}

function Form(props: FormProps) {
    let subComponent = props.children;
    if (_.isArray(subComponent)) {
        subComponent = _.map(subComponent, item => console.log(item))
    }
    return (
        <form className='form' onSubmit={props.onSubmit} onChange={props.onChange}>
            {props.children}
        </form>
    )
}

export { Form }