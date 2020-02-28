const Koa = require('koa');
const config = require('../config/default');
const proxyThrift = require('./middlewares/proxy-thrift').default;
const koaWebpack = require('koa-webpack');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const path = require('path');
const router = require('./middlewares/router').default;
const koaBody = require('koa-body');
const bodyParser = require('koa-bodyparser');
// const bodyParser = require('koa-bodyparser')



process.env.NODE_ENV = process.env.NODE_ENV === undefined ? 'development' : process.env.NODE_ENV;

const app = new Koa();
const compiler = webpack(webpackConfig);
app.use(koaBody());
app.use(router.routes());
app.use(proxyThrift);
async function start() {
    const middleware = await koaWebpack({ compiler });
    app.use(middleware);
    
    app.use(async (ctx, next) => {
      if (!ctx.path.match(/\/api/)) {
        const filename = path.resolve(__dirname, '../dist/index.html');
        ctx.response.type = 'html';
        ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(filename);
      } else {
        await next()
      }
      });
    app.listen(config.serverPort);
}

start();

