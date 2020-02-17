import * as React from 'react';
import * as ReactDom from 'react-dom';
import { PageLayout } from './components/core/pageLayout';
import './styles/index.less';
import 'antd/dist/antd.css';

ReactDom.render(<PageLayout />, document.getElementById('app'));