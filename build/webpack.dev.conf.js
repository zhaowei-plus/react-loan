
const utils = require('./utils');
const path = require('path');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const debug = require('debug')('app:config:dev');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const zcyHtmlBaseData = require('@zcy/html-base-data');
const MergeRouterPlugin = require('./merge-router-plugin');
const packageJson = require('../package.json');

Object.keys(baseWebpackConfig.entry).forEach((name) => {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

debug(`合并webpack ${config.dev.env.NODE_ENV} 环境配置`);

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true,
    }),
  },
  devtool: config.dev.devtool,
  plugins: [
    new MergeRouterPlugin(),
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
      __DEV__: true,
      PROJECTNAME: `"${packageJson.name}"`,
    }),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        );
      },
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.hbs',
      inject: true,
      data: zcyHtmlBaseData,
    }),
  ],
});

if (config.dev.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  devWebpackConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerPort: config.dev.analyzerPort || 7889,
  }));
}

debug(`合并webpack ${config.dev.env.NODE_ENV} 环境配置成功`);
module.exports = devWebpackConfig;
