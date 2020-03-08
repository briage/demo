import * as React from 'react';
import { Layout, Button } from 'antd';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import { Header as HeaderContent } from './header';
import { MenuList } from './menu';
import { ContentComponent } from './content';
import Breadcrumbs from './Breadcrumb';
import { Login } from '../../pages/login';

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
                    <Route key='content' path='/'>
                        <Layout style={{height: '100vh'}}>
                            <Header>
                                <HeaderContent userInfo={this.state.userInfo} />
                            </Header>
                            <Layout>
                                <BrowserRouter basename='/'>
                                    <Sider className='sider-menu'>
                                        <MenuList userInfo={this.state.userInfo} />
                                    </Sider>
                                    <Content>
                                        <Breadcrumbs />
                                        <ContentComponent userInfo={this.state.userInfo} />
                                    </Content>
                                </BrowserRouter>
                            </Layout>
                        </Layout>
                    </Route>
                </Switch>
            </BrowserRouter>
        )
    };
}