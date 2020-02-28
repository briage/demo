import * as React from 'react';
import { Input } from 'antd';
import { placeholder } from '@babel/types';

interface InputProps {
    type: 'text' | 'number' | 'password',
    name: string,
    value: string | number,
    label?: string,
    placeholder?: string,
    defaultValue?: string | number,
    disabled?: boolean,
    autofocus?: boolean,
    onChange?: (event: React.FormEvent<HTMLInputElement>) => void
}

function MyInput(props: InputProps) {
    const { label } = props;
    return (
        <>
            { label && <span>{ label }：</span> }
            <Input { ...props } />
        </>
    )
}

export { MyInput };