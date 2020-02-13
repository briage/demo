import * as React from 'react';
import { Layout, Button, Menu } from 'antd';

import { Header as HeaderContent } from './header';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu, Item } = Menu;

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
                        <Sider className='sider-menu'>
                            <Menu
                                mode="inline"
                            >
                                <SubMenu>
                                    <Item key='demo1'>demo1</Item>
                                    <Item key='demo2'>demo2</Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content><Button>Content</Button></Content>
                    </Layout>
                </Layout>
            </>
        )
    };
}