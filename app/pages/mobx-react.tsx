import * as React from 'react';
import { observable, action, computed } from 'mobx';
import { observer, Observer } from 'mobx-react';
import * as _ from 'lodash';
import { Row, Col, Button, Input } from 'antd';

class Data {
    @observable num = 1
}
const data = new Data();
const formData = observable({
    name: 'name',
    age: 'age'
})
const add = action(() => {
    data.num ++;
    console.log(data.num)
})
const change = action((name, e) => {
    formData[name] = e.target.value;
})
const mul = computed(() => data.num * 10);
const BaseNum = observer(({data}) => <div>{data.num}</div>);
const ComputedNum = observer(({num}) => <div>{num.get()}</div>);
export class MobxReact extends React.Component {
   
    render() {
        return (
            <>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Button onClick={add}>加法</Button>
                        <BaseNum data={data} />
                        <ComputedNum num={mul} />
                        <Observer>{() => <div>{data.num}</div>}</Observer>
                        <Observer>{() => <Input value={formData.name} onChange={change.bind(this, 'name')} />}</Observer>
                        <Observer>{() => <div>{formData.name}</div>}</Observer>
                        <Observer>{() => <Input value={formData.age} onChange={change.bind(this, 'age')} />}</Observer>
                        <Observer>{() => <div>{formData.age}</div>}</Observer>
                    </Col>
                    <Col span={12}>
                        <pre className='code'>
                            <code>
                            {`const data = observable({
    num: 1
})
const formData = observable({
    name: 'name',
    age: 'age'
})
const add = action(() => {
    data.num ++;
    console.log(data.num)
})
const change = action((name, e) => {
    formData[name] = e.target.value;
})
const mul = computed(() => data.num * 10);
const BaseNum = observer(({data}) => <div>{data.num}</div>);
const ComputedNum = observer(({num}) => <div>{num.get()}</div>);
<Button onClick={add}>加法</Button>
<BaseNum data={data} />
<ComputedNum num={mul} />
<Observer>{() => <div>{data.num}</div>}</Observer>
<Observer>{() => <Input value={formData.name} onChange={change.bind(this, 'name')} />}</Observer>
<Observer>{() => <div>{formData.name}</div>}</Observer>
<Observer>{() => <Input value={formData.age} onChange={change.bind(this, 'age')} />}</Observer>
<Observer>{() => <div>{formData.age}</div>}</Observer>
`}
</code>
                        </pre>
                    </Col>
                </Row>
            </>
        )
    }
}