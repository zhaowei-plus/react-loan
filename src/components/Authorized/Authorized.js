import React from 'react';
import { connect } from 'dva';
import { checkUrlPermission } from 'src/common/services/app';
import CheckPermissions, { needCheck } from './CheckPermissions';

@connect()
class Authorized extends React.Component {
  /**
   * url鉴权
   */
  urlAuthority = () => {
    const { pathname } = this.props.location;
    const prefix = 'PROJECTNAME';
    if (!this.needCheckUrl()) {
      return Promise.resolve({
        result: {
          isPermit: true,
        },
      });
    }
    return checkUrlPermission({
      method: 'get',
      path: `/${prefix}${pathname.startsWith('/') ? pathname : `/${pathname}`}`,
    });
  }

  /**
   * 页面鉴权
   */
  pageAuthority = () => {
    const { pageId, dispatch } = this.props;
    if (!this.needCheckPage()) {
      return Promise.resolve();
    }
    return dispatch({
      type: 'privileges/fetchPagePermit',
      payload: {
        pageId,
      },
    });
  }

  isPromise = () => {
    if (this.needCheckUrl() || this.needCheckPage()) {
      return true;
    }
    return false;
  }

  needCheckUrl = () => {
    const { location } = this.props;
    const { pathname } = location;
    if (needCheck(pathname)) {
      return true;
    }
    return false;
  }

  needCheckPage = () => {
    const { pageId } = this.props;
    if (pageId) {
      return true;
    }
    return false;
  }

  render() {
    const { children, noMatch = null } = this.props;

    const childrenRender = typeof children === 'undefined' ? null : children;
    const isPromise = this.isPromise();
    const promise = [this.urlAuthority, this.pageAuthority];
    return CheckPermissions(
      childrenRender,
      noMatch,
      isPromise,
      promise,
    );
  }
}

export default Authorized;
