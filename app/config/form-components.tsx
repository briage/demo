import * as React from 'react';
import _ from 'lodash';
import { Input, Select, Radio, Upload } from 'antd';
import { Props, OptionsArrayItem } from '../components/form-components/form-contorl';

const { Option } = Select;

export interface FormComponents_Item {
    type: string | string[],
    component: (props) => React.ReactNode
}

const FormComponents_Map: Array<FormComponents_Item> = [
    {
        type: ['text', 'number', 'password', 'textarea'],
        component: (props: Props) => <Input { ...props } />
    }, {
        type: 'select',
        component: (props: Props) => {
            let optionsList = [];
            let { options } = props;
            for (let item in options) {
                if (_.isObject(options[item])) {
                    optionsList.push(
                        <Option key={item} value={(options[item] as OptionsArrayItem).value}>{ (options[item] as OptionsArrayItem).label }</Option>
                    )
                } else {
                    optionsList.push(
                        <Option key={item} value={item}>{ options[item] }</Option>
                    )
                }
            }
            return (
                <Select {...props} >
                    { optionsList }
                </Select>
            )}
    }, {
        type: 'radio',
        component: (props) => <Radio.Group {...props} />
    }, {
        type: 'upload',
        component: props => <Upload {...props} />
    }
]

export { FormComponents_Map };