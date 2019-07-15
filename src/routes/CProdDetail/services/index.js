import { request } from 'doraemon';


const urls = {
  actionRecord: '/api/loan/action/create',
  productDetail: '/api/loan/front/product',
  measureCredit: '/api/loan/front/product/applyCalculate',
  supplierCompleteInfo: '/api/loan/supplierCompleteInfo',
  bidItemList: '/api/loan/front/product/applyCalculate/getProject',
};
export async function reqProdDetail(payload) {
  return request(urls.productDetail, {
    ...payload,
  });
}


export async function reqMeasureCredit(payload) {
  return request(urls.measureCredit, {
    method: 'POST',
    data: payload,
  });
}


export async function reqActionRecord(payload) {
  return request(urls.actionRecord, {
    method: 'POST',
    data: payload,
  });
}

export async function reqSupplierCompleteInfo(payload) {
  return request(urls.supplierCompleteInfo, {
    method: 'POST',
    data: payload,
  });
}


export async function reqBidItemList(params) {
  return request(urls.bidItemList, {
    method: 'GET',
    params,
  });
}
