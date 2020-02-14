import * as React from 'react';
import { Layout, Button } from 'antd';
import { BrowserRouter } from 'react-router-dom';

import { Header as HeaderContent } from './header';
import { MenuList } from './menu';
import { ContentComponent } from './content'

const { Header, Content, Footer, Sider } = Layout;

export default class PageLayout extends React.Component {
    render() {
        console.log(11)
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
                                <ContentComponent />
                            </Content>
                        </BrowserRouter>
                    </Layout>
                </Layout>
            </>
        )
    };
}