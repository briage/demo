import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import { routers } from '../../config/router'

function ContentComponent() {
    return (
        <Switch>
            {routers.map((route) => <Route key={route.key} exact={route.exact} path={route.path}>
                { route.component }
            </Route>)}
        </Switch>
    )
}

export { ContentComponent };