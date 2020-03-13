import * as React from 'react';
import _ from 'lodash';
import { FormComponents_Map } from '../../config/form-components';

export interface OptionsArrayItem {
    label: string,
    value: string | number,
    disabled?: boolean
}

export interface Props {
    value: any,
    name: string,
    key?: string,
    type: string,
    style?: object,
    label?: string,
    options?: string[] | OptionsArrayItem[],
    defaultValue?: any,
    disabled?: boolean,
    layout?: number,
    onChange?: (event?: React.FormEvent) => void,
}

function FormContorl(props) {
    return (
        <div className={`form-control ${props.layout ? `layout-${props.layout}` : 'layout-1'}`}>
            { props.label && <span className='label'>{ props.label }</span> }
            <div className='component'>
                {
                    _.filter(FormComponents_Map, item => item.type.indexOf(props.type) > -1)[0].component(props)
                }
            </div>
        </div>
    )
}

export { FormContorl };