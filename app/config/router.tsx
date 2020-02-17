import * as React from 'react';

import { MobxReact } from '../pages/mobx-react';
import { RxJs } from '../pages/rxjs';

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
    }, {
        key: 'rxjs',
        path: '/rxjs',
        exact: true,
        component: routerComponent(<RxJs />)
    }
];

export { routers };