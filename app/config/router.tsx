import * as React from 'react';

import { Index } from '../pages/index';
import { Course } from '../pages/course';
import { TestPaper } from '../pages/test-paper';
import { NodeManager } from '../pages/node-manager';
import { TestManager } from '../pages/test-manager';
import { UserCenter } from '../pages/user-center';
import { Live } from '../pages/live';

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
    auth: 1 | 2 | 3,
    component: React.ReactNode
}

const routers: Array<RouterList> = [
    {
        key: 'index',
        path: '/',
        exact: true,
        auth: 2,
        component: routerComponent(<Index />)
    }, {
        key: 'course',
        path: '/course',
        exact: true,
        auth: 3,
        component: routerComponent(<Course />)
    }, {
        key: 'test-paper',
        path: '/test-paper',
        exact: true,
        auth: 2,
        component: routerComponent(<TestPaper />)
    }, {
        key: 'node-manager',
        path: '/node-manager',
        exact: true,
        auth: 3,
        component: routerComponent(<NodeManager />)
    }, {
        key: 'test-manager',
        path: '/test-manager',
        exact: true,
        auth: 2,
        component: routerComponent(<TestManager />)
    }, {
        key: 'user-center',
        path: '/user-center',
        exact: true,
        auth: 1,
        component: routerComponent(<UserCenter />)
    }
];

export { routers };