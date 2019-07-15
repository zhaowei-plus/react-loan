/**
 * 路由总入口文件
 * 通过getRouterData向layout中注入路由配置
 */
import React from 'react';
import { routerRedux, Route } from 'dva/router';
import { getRouterData } from './common/router';
import ZcyLayout from './layouts/ZcyLayout';

const { ConnectedRouter } = routerRedux;

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  return (
    <ConnectedRouter history={history}>
      <Route
        path="/"
        render={props => <ZcyLayout routerData={routerData} {...props} />}
        redirectPath="/exception/403"
      />
    </ConnectedRouter>
  );
}

export default RouterConfig;
