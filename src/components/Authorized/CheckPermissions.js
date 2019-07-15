import React from 'react';
import checkList from 'src/common/checkPermitUrl';
import PromiseRender from './PromiseRender';

export const needCheck = (path) => {
  if (/^\/exception\/.*/.test(path)) {
    return false;
  }
  for (const reg in checkList) {
    if (checkList[reg].test(path)) {
      return true;
    }
  }
  return false;
};

/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { 权限判定 Permission judgment type string |array | Promise | Function } authority
 * @param { 通过的组件 Passing components } target
 * @param { 未通过的组件 no pass components } Exception
 * @param { 你的权限 Your permission description  type:string} currentAuthority
 */
const checkPermissions = (target, Exception, isPromise, promise) => {
  // 没有判定权限.默认查看所有
  // Retirement authority, return target;
  if (!isPromise) {
    return target;
  }
  return (
    <PromiseRender
      ok={target}
      error={Exception}
      promise={promise}
    />
  );
};

export default checkPermissions;
