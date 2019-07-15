import { request } from 'doraemon';

const urls = {
  // 产品发布记录
  releaseList: '/api/releaseList',
  // 贷款条件
  loanCondition: '/api/loan/product/condition/list',
  // 基础产品配置详情
  basicProdConfigDetail: '/api/loan/product/basis/detail',
  // 新增/更新产品配置详情
  addBasicProdConfig: '/api/loan/product/basis',
  // 收费类型选项
  chargeTypes: '/api/loan/product/basis/toll',
  // 资方渠道列表
  channelList: '/api/loan/channel/summary/list',
  prodDetail: '/api/loan/product/channel/detail',
  addProd: '/api/loan/product/channel',
  districtTree: '/zcy/user-web/v2/tenants/tree',
  processList: '/api/loan/product/processName',
  productTypeList: '/api/loan/product/productType',

};

export async function reqProdDetail(params) {
  return request(urls.prodDetail, {
    method: 'GET',
    params,
  });
}


export async function reqUpdateProd(payload) {
  return request(urls.addProd, {
    ...payload,
  });
}


export async function reqBasicProdConfigDetail(params) {
  return request(urls.basicProdConfigDetail, {
    method: 'GET',
    params,
  });
}


export async function reqUpdateBasicProdConfig(params) {
  return request(urls.addBasicProdConfig, {
    ...params,
  });
}


export async function reqChargeTypes(params) {
  return request(urls.chargeTypes, {
    method: 'GET',
    params,
  });
}

export async function reqChannelList(params) {
  return request(urls.channelList, {
    method: 'GET',
    params,
  });
}


export async function reqLoanCondition(params) {
  return request(urls.loanCondition, {
    params,
  });
}


export async function reqSupplierList(params) {
  return request(urls.supplierList, {
    params,
  });
}


export async function reqDistTree(params = {}) {
  return request(`${urls.districtTree}/${params.code}`, {
    method: 'GET',
    params,
  });
}


export async function reqProcessList(params = {}) {
  return request(urls.processList, {
    method: 'GET',
    params,
  });
}

export async function reqProductTypeList(params = {}) {
  return request(urls.productTypeList, {
    method: 'GET',
    params,
  });
}

