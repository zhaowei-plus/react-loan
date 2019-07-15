import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authorized from './Authorized';

class AuthorizedRoute extends React.Component {
  render() {
    const {
      component: Component,
      render,
      redirectPath,
      location,
      ...rest
    } = this.props;

    return (
      <Authorized
        {...rest}
        location={location}
        noMatch={<Route {...rest} render={() => <Redirect to={{ pathname: redirectPath }} />} />}
      >
        <Route
          {...rest}
          render={props => (Component ? <Component {...props} /> : render(props))}
        />
      </Authorized>
    );
  }
}

export default AuthorizedRoute;
