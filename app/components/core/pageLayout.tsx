import * as React from 'react';
import { Layout, Button } from 'antd'

const { Header, Content, Footer, Sider } = Layout;

export default class PageLayout extends React.Component {
    render() {
        console.log(11)
        return (
            <>
                <Layout>
                    <Header>Header</Header>
                    <Layout>
                        <Sider>Sider</Sider>
                        <Content><Button>Content</Button></Content>
                    </Layout>
                    <Footer>Footer</Footer>
                </Layout>
            </>
        )
    };
}