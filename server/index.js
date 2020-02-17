const Koa = require('koa');
const config = require('../config/default');

const app = new Koa();

process.env.NODE_ENV = process.env.NODE_ENV === undefined ? 'development' : process.env.NODE_ENV;


app.listen(config.serverPort);

