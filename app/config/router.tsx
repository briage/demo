import * as React from 'react';
import { MobxReact } from '../pages/mobx-react';
import { exact } from 'prop-types';

const { Suspense } = React;

const routerComponent = (component: React.ReactNode): React.ReactNode => (
    <Suspense fallback={<div>loading</div>}>
        { component }
    </Suspense>
)

interface RouterList {
    key: string,
    path: string,
    exact: boolean,
    component: React.ReactNode
}

const routers: Array<RouterList> = [
    {
        key: 'mobx-react',
        path: '/mobx-react',
        exact: true,
        component: routerComponent(<MobxReact />)
    }
];

export { routers };