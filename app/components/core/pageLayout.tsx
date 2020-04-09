import * as React from 'react';
import { Layout, Button } from 'antd';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import { Header as HeaderContent } from './header';
import { MenuList } from './menu';
import { ContentComponent } from './content';
import Breadcrumbs from './Breadcrumb';
import { Login } from '../../pages/login';
import { Live } from '../../pages/live';

const { Header, Content, Sider } = Layout;
export class PageLayout extends React.Component {
    state = {
        userInfo: {
            userName: '',
            password: '',
            sex: '',
            phone: '',
            email: '',
            courseIds: '',
            selfset: '',
            type: '',
        }
    }
    componentDidMount() {
        if (location.pathname !== '/login') {
            axios.get('/api/auth')
            .then(res => {
                let { data } = res;
                if (data.success) {
                    sessionStorage.setItem('userInfo', JSON.stringify(data.data))
                    this.setState({
                        userInfo: data.data
                    })
                } else {
                    location.href = '/login';
                }
            })
        }
    }
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route key='login' exact={true} path='/login' >
                        <Login/>
                    </Route>
                    <Route key='live' exact={true} path='/live'>
                        <Live />
                    </Route>
                    <Route key='content' path='/'>
                        <Layout key='layout' style={{height: '100vh'}}>
                            <Header>
                                <HeaderContent key='header-content' userInfo={this.state.userInfo} />
                            </Header>
                            <Layout>
                            <Sider key='browser-sider' className='sider-menu'>
                                <MenuList key='menu-list' userInfo={this.state.userInfo} />
                            </Sider>
                            <Content>
                                <Breadcrumbs key='breadcrumbs' />
                                <ContentComponent key='content' userInfo={this.state.userInfo} />
                            </Content>
                            </Layout>
                        </Layout>
                    </Route>
                </Switch>
            </BrowserRouter>
        )
    };
}