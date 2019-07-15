import { createElement } from 'react';
import routerConfig from 'src/router-config';

let routerDataCache;

const modelNotExisted = (app, model) => (
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.namespace;
  })
);

const dynamicWrapper = (app, config) => {
  const component = () => require(`src/routes/${config.path}`);
  !!config.models && config.models.forEach((modelFile) => {
    const model = require(`src/${modelFile}`).default;
    if (modelNotExisted(app, model)) {
      app.model(model);
    }
  });

  return (props) => {
    if (!routerDataCache) {
      routerDataCache = getRouterData(app);
    }
    return createElement(component().default, {
      ...props,
      routerData: routerDataCache,
    });
  };
  // return dynamic({
  //   app,
  //   models: () => {
  //     const result = [];
  //     !!config.models && config.models.forEach((modelFile) => {
  //       const model = import(`src/${modelFile}`);
  //       result.push(model);
  //     });
  //     return result;
  //   },
  //   component: () => {
  //     if (!routerDataCache) {
  //       routerDataCache = getRouterData(app);
  //     }
  //     return component().then((raw) => {
  //       const Component = raw.default || raw;
  //       return props => createElement(Component, {
  //         ...props,
  //         routerData: routerDataCache,
  //       });
  //     });
  //   },
  // });
};

export const getRouterData = (app) => {
  const routerData = {};
  Object.keys(routerConfig).forEach((path) => {
    let router = routerConfig[path];
    router = {
      ...router,
      name: router.name || '',
      component: dynamicWrapper(app, routerConfig[path]),
    };
    routerData[path] = router;
  });
  return routerData;
};
