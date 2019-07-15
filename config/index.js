const path = require('path');

module.exports = {
  dev: {
    env: require('./dev.env'),
    port: 7888,
    analyzerPort: 7889,
    assetsPublicPath: '/',
    assetsSubDirectory: 'loan-assets',
    autoOpenBrowser: true,
    cssSourceMap: false,
    devtool: 'cheap-module-eval-source-map',
    bundleAnalyzerReport: true,
    proxyOptions: require('./proxy'),
  },
  test: {
    env: require('./prod.env'),
    assetsPublicPath: '/',
    assetsSubDirectory: 'loan-assets', // 需修改
  },
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsPublicPath: 'https://sitecdn.zcycdn.com/',
    assetsSubDirectory: 'loan-static', // 需修改
    productionSourceMap: true,
    devtool: '#source-map',
  },
};
