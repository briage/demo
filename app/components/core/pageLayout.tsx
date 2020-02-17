import * as React from 'react';
import { Layout, Button } from 'antd';
import { BrowserRouter, withRouter } from 'react-router-dom';

import { Header as HeaderContent } from './header';
import { MenuList } from './menu';
import { ContentComponent } from './content';
import Breadcrumbs from './Breadcrumb'

const { Header, Content, Sider } = Layout;
export class PageLayout extends React.Component {
    render() {
        return (
            <>
                <Layout style={{height: '100vh'}}>
                    <Header>
                        <HeaderContent />
                    </Header>
                    <Layout>
                        <BrowserRouter basename='/'>
                            <Sider className='sider-menu'>
                                <MenuList />
                            </Sider>
                            <Content>
                                <Breadcrumbs />
                                <ContentComponent />
                            </Content>
                        </BrowserRouter>
                    </Layout>
                </Layout>
            </>
        )
    };
}