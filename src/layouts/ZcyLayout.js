import React from 'react';
import { Route, Redirect, Switch } from 'dva/router';
import NotFound from 'src/routes/Exception/views/404';
import Authorized from 'src/components/Authorized';
import { ZcyLayout } from 'doraemon';
import { getRoutes } from '../utils/utils';

const { AuthorizedRoute } = Authorized;

const ZcyBaseLayout = function ZcyBaseLayout({ routerData, match }) {
  return (
    <ZcyLayout>
      <Switch>
        {
          getRoutes(match.path, routerData).map(item =>
            (
              <AuthorizedRoute
                {...item}
                redirectPath="/exception/403"
              />
            )
          )
        }
        <Redirect from="/" exact to="/exception/404" />
        <Route render={props => <NotFound {...props} />} />
      </Switch>
    </ZcyLayout>
  );
};

export default ZcyBaseLayout;
