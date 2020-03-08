import * as React from 'react';
import _ from 'lodash';
// import { Form } from 'antd';

interface FormProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    onChange: (event: React.FormEvent<HTMLFormElement>) => void,
    children: React.ReactNodeArray | React.ReactNode,
    layout?: number
    className?: string
}

function Form(props: FormProps) {
    return (
        <form className={ `form ${props.className ? props.className : ''}` } onSubmit={props.onSubmit} onChange={props.onChange}>
            {props.children}
        </form>
    )
}

export { Form }