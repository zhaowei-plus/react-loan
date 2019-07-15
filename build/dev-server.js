const config = require('../config');
const utils = require('./utils');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.conf');
const express = require('express');
const opn = require('opn');
const debug = require('debug')('app:server');
const bodyParser = require('body-parser');

debug('设置server启动配置');
const port = process.env.PORT && Number(process.env.PORT) || config.dev.port;
const autoOpenBrowser = !!config.dev.autoOpenBrowser;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

debug('编译webpack配置');
const compiler = webpack(webpackConfig);

debug('webpack编译完成');
debug('将编译流通过webpack-dev-middleware');
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  lazy: false,
  stats: {
    chunks: false,
    chunkModules: false,
    colors: true,
  },
  watchOptions: {
    ignored: /node_modules/,
  },
});

debug('将编译流通过webpack-hot-middleware');
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {
  },
  heartbeat: 2000,
});

// debug('添加html修改自动刷新钩子')
// compiler.plugin('compilation', (compilation) => {
//     compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
//         hotMiddleware.publish({action: 'reload'})
//         cb()
//     })
// })

debug('设置静态文件托管目录');
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('public'));

debug('设置代理信息');
require('./dev-proxy')(app);

debug('添加history-fallback中间件');
app.use(require('connect-history-api-fallback')());

debug('添加webpack-dev-middleware中间件');
app.use(devMiddleware);

debug('添加webpack-hot-middleware中间件');
app.use(hotMiddleware);

const uri = `http://localhost:${port}`;


debug('> Starting dev server...');
debug('设置webpack-dev-middleware中间件编译后的回调');
devMiddleware.waitUntilValid(() => {
  debug(`> Listening at ${uri}\n`);

  if (autoOpenBrowser) {
    opn(uri);
  }
});

const server = app.listen(port, () => {
  debug(`server开始监听端口${port}`);
})
