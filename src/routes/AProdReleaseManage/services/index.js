import { request } from 'doraemon';

const urls = {
  prodReleaseList: '/api/loan/product/channel',
  toggleProdStatus: ' /api/loan/product/channel/release',
  supplierList: '/api/loan/product/channel/supplier',
  prodDetail: '/api/loan/product/basis',
};

export async function reqReleaseList(params) {
  return request(urls.prodReleaseList, {
    method: 'GET',
    params,
  });
}

export async function reqProdToggleStatus(params) {
  return request(urls.toggleProdStatus, {
    method: 'GET',
    params,
  });
}

export async function reqRegion(code) {
  return request(`/api/address/${code}/children`);
}

export async function reqSupplierList(params) {
  return request(urls.supplierList, {
    params,
  });
}

export async function reqProdDetail(params) {
  return request(urls.prodDetail, {
    params,
  });
}
