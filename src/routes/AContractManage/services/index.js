import { request } from 'doraemon';

// 合同列表
export async function reqContractManage(params) {
  return request('/api/loan/contract', {
    params,
  });
}

// 合同详情
export async function reqContractDetail(params) {
  return request('/api/loan/trade/applyRecord/detail', {
    params,
  });
}
