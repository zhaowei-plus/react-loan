const fs = require('fs');
const path = require('path');
const _ = require('lodash');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

function MegerRouterPlugin(options) {
  // options是配置文件，你可以在这里进行一些与options相关的工作
}

MegerRouterPlugin.prototype.apply = function (compiler) {
  compiler.plugin('before-compile', (compilation, callback) => {
    const data = {};
    const routesPath = resolve('src/routes');
    const targetFile = resolve('src/router-config.js');
    const dirs = fs.readdirSync(routesPath);
    try {
      dirs.forEach((dir) => {
        const routePath = resolve(`src/routes/${dir}`);
        if (!fs.statSync(routePath).isDirectory()) {
          return true;
        }
        delete require.cache[`${routePath}/index.js`];
        const routeInfo = require(routePath);
        if (!_.isArray(routeInfo)) {
          generate(routeInfo, dir, data);
        } else {
          routeInfo.map((config) => {
            generate(config, dir, data);
          });
        }
      });
    } catch (e) {
      console.log(e);
    }

    if (fs.existsSync(targetFile)) {
      delete require.cache[targetFile];
      const targetData = require(targetFile);
      if (!_.isEqual(targetData, data)) {
        writeFile(targetFile, data);
      }
    } else {
      writeFile(targetFile, data);
    }

    // 最后调用callback
    callback();
  });
};

function writeFile(targetFile, data) {
  fs.writeFileSync(targetFile, `module.exports = ${JSON.stringify(data, null, 2)}`, 'utf-8');
}

function generate(config, dir, data) {
  mergeConfig(config, dir, data);
  getChildRoutes(config.childRoutes, dir, data, config.url);
}

function getModels(modelsDir, models) {
  if (!fs.existsSync(modelsDir)) {
    return [];
  }
  let files = fs.readdirSync(modelsDir);
  files = files.filter((item) => {
    return /\.jsx?$/.test(item);
  });
  if (!models || !models.length) {
    if (files.indexOf('index.js') > -1) {
      return [`${modelsDir.replace('src/', '')}/index.js`];
    }
    return [];
  }
  return models.map((item) => {
    if (files.indexOf(`${item}.js`) > -1) {
      return `${modelsDir.replace('src/', '')}/${item}.js`;
    }
  });
}

function getChildRoutes(childRoutes, dir, targetData, oUrl) {
  if (!childRoutes) {
    return;
  }
  childRoutes.map((option) => {
    option.url = oUrl + option.url;
    if (option.childRoutes) {
      getChildRoutes(option.childRoutes, dir, targetData, option.url);
    }
    mergeConfig(option, dir, targetData);
  });
}

function mergerExtraModels(config, models) {
  return models.concat(config.extraModels ? config.extraModels : []);
}

function mergeConfig(config, dir, targetData) {
  const { view, models, extraModels, url, childRoutes, ...rest } = config;
  const dirModels = getModels(`src/routes/${dir}/models`, models);
  const data = {
    ...rest,
  };
  data.path = `${dir}/views${view ? `/${view}` : ''}`;
  if (dirModels.length || (extraModels && extraModels.length)) {
    data.models = mergerExtraModels(config, dirModels);
  }
  Object.assign(targetData, {
    [url]: data,
  });
}

module.exports = MegerRouterPlugin;
