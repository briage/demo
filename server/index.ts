const Koa = require('koa');
const config = require('../config/default');
// const proxyThrift = require('./middlewares/proxy-thrift').default;
const koaWebpack = require('koa-webpack');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const path = require('path');
const router = require('./middlewares/router').router;
const koaBody = require('koa-body');
const sourceLoad = require('./middlewares/source-load').sourceLoad;
const liveLoad = require('./middlewares/live').liveLoad;


process.env.NODE_ENV = process.env.NODE_ENV === undefined ? 'development' : process.env.NODE_ENV;

const app = new Koa();
const compiler = webpack(webpackConfig);
app.use(koaBody({
  multipart: true,
  formidable: {
      maxFileSize: 2000 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
  }
}));
app.use(router.routes());
app.use(sourceLoad);
app.use(liveLoad)
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

