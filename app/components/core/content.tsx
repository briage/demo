import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import { routers } from '../../config/router'

function ContentComponent(props) {
    const userType = props.userInfo.type;
    return (
        <Switch>
            {routers.map(route => (
                route.auth <= userType ?
                    <Route key={route.key} exact={route.exact} path={route.path}>
                        { route.component }
                    </Route>
                    : ''
                )
            )}
        </Switch>
    )
}

export { ContentComponent };