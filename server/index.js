const Koa = require('koa');
const webpackMiddleware = require('koa-webpack-dev-middleware');
const webpack = require('webpack');

const webpackConfig = require('../webpack.config.js');
const config = require('../config/default');

const compiler = webpack(webpackConfig);
const app = new Koa();

process.env.NODE_ENV = process.env.NODE_ENV === undefined ? 'development' : process.env.NODE_ENV;

app.use(webpackMiddleware(compiler, {
    stats: {
        colors: true
    }
}));

app.listen(config.port);

