import React, { Component } from 'react';
import { FULL_LOCATION } from '../constant';

const routeOfPath = [{
  path: '/product-release/edit',
  first: '产品发布记录',
  second: '配置',
  panelTitle: '渠道产品配置',
  pageType: 'PRODUCT_EDIT',
}, {
  path: '/product-release/create',
  first: '基础产品设计',
  second: '创建渠道产品',
  panelTitle: '创建渠道产品',
  pageType: 'PRODUCT_CREATE',
}, {
  path: '/product-release/view',
  first: '产品发布记录',
  second: '详情',
  panelTitle: '渠道产品详情',
  pageType: 'PRODUCT_VIEW',
}, {
  path: '/product-basic-config/edit',
  first: '基础产品设计',
  second: '配置',
  panelTitle: '基础产品配置',
  pageType: 'BASIC_CONFIG_EDIT',
}, {
  path: '/product-basic-config/create',
  first: '基础产品设计',
  second: '新增基础产品',
  panelTitle: '新增基础产品',
  pageType: 'BASIC_CONFIG_CREATE',
}, {
  path: '/product-basic-config/view',
  first: '基础产品设计',
  second: '详情',
  panelTitle: '基础产品详情',
  pageType: 'BASIC_CONFIG_VIEW',
}];


const initPage = (match, storeTarget) => {
  const { path, params } = match;
  setRoutes(path, storeTarget);
  storeParams(params, storeTarget);
  setPageLocation(storeTarget);
};


/**
 * 根据路径
 * 判断页面类型 pageType
 * 生成路由面包屑
 * @param path
 * @param storeTarget  component class
 */
const setRoutes = (path, storeTarget) => {
  let firstRouter = '';
  let secondRouter = '';
  let pageType = '';
  let panelTitle = '';

  routeOfPath.forEach((pathItem) => {
    if (path.indexOf(pathItem.path) > -1) {
      firstRouter = pathItem.first;
      secondRouter = pathItem.second;
      pageType = pathItem.pageType;
      panelTitle = pathItem.panelTitle;
    }
  });
  storeTarget.router = [{
    label: firstRouter,
  }, {
    label: secondRouter,
  }];

  storeTarget.panelTitle = panelTitle;
  storeTarget.isBasicConfig = ['BASIC_CONFIG_EDIT', 'BASIC_CONFIG_CREATE', 'BASIC_CONFIG_VIEW'].includes(pageType);
  storeTarget.pageType = pageType;
};

const storeParams = (params, target) => {
  target.queryId = params.id;
};

/**
 * 计算页面展示的定位器展示模块信息
 * @param storeTarget component class
 */
const setPageLocation = (storeTarget) => {
  const { pageType } = storeTarget;

  const location = FULL_LOCATION.filter((item) => {
    /**
     * 渠道产品配置 PRODUCT_EDIT
     * 渠道产品详情 PRODUCT_VIEW
     * 展示 基础数据统计模块  base-statistics
     */
    if (item.target === 'base-statistics') {
      if (!['PRODUCT_EDIT', 'PRODUCT_VIEW'].includes(pageType)) {
        return false;
      }
    }

    /**
     * BASIC_CONFIG_EDIT
     * BASIC_CONFIG_CREATE
     * BASIC_CONFIG_VIEW
     * 基础配置页面 不展示橱窗模块
     */
    if (item.target === 'show-case') {
      if (['BASIC_CONFIG_EDIT', 'BASIC_CONFIG_CREATE', 'BASIC_CONFIG_VIEW'].includes(pageType)) {
        return false;
      }
    }
    return true;
  });

  storeTarget.location = location;
};

/**
 * hoc
 * 提供编辑和详情页面共用的方法
 */
const withCheckPageType = () => {
  return (BaseComponent) => {
    return class extends Component {
      render() {
        return (
          <BaseComponent
            initPage={initPage}
            {...this.props}
          />
        );
      }
    };
  };
};

export default withCheckPageType;
