const path = require('path');
const config = require('../config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.assetsPath = (_path) => {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : (process.env.NODE_ENV === 'test'
      ? config.test.assetsSubDirectory
      : config.dev.assetsSubDirectory);
  return path.posix.join(assetsSubDirectory, _path);
};

exports.cssLoaders = (options) => {
  options = options || {};

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap,
    },
  };

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap,
    },
  };

  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];

    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap,
        }),
      });
    }

    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'style-loader',
      });
    } else {
      return ['style-loader'].concat(loaders);
    }
  }

  return {
    css: generateLoaders(),
    less: generateLoaders('less'),
  };
};

exports.styleLoaders = (options) => {
  const output = [];
  const loaders = exports.cssLoaders(options);

  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp(`\\.${extension}$`),
      use: loader,
    });
  }
  return output;
};
