import Router from 'koa-router';

const router = new Router();

import './login';
import './auth';
import './course';
import './upload';
import './node-manager';
import './test-manager';
import './test-paper';

export {router};
