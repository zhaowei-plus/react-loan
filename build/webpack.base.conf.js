
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const debug = require('debug')('app:config:base');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 6 });

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

debug('创建webpack base配置');

module.exports = {
  entry: {
    app: './src/main.js',
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath
      : (process.env.NODE_ENV === 'test' ? config.test.assetsPublicPath : config.dev.assetsPublicPath),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      src: resolve('src'),
      assets: resolve('src/assets'),
      doraemon: '@zcy/doraemon',
      utils: resolve('src/utils/utils.js'),
      commonUtils: resolve('src/utils/commonUtil.js'),
      common: resolve('src/common'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'happypack/loader?id=jsx',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
    ],
  },
  plugins: [
    new HappyPack({
      id: 'jsx',
      threads: 6,
      loaders: ['babel-loader?cacheDirectory=true'],
    }),
    new HappyPack({
      id: 'css',
      threads: 4,
      loaders: [{
        loader: 'css-loader',
        options: {
          sourceMap: process.env.NODE_ENV === 'production',
        },
      }],
    }),
    new HappyPack({
      id: 'less',
      threads: 4,
      loaders: ['less-loader'],
    }),
  ],
};
debug('webpack base配置创建成功');
