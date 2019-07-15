import { request } from 'doraemon';

// 查询供应商资金流水
export async function reqFundsFlows(params) {
  return request('/api/loan/supplier/capitalFlow', {
    params: {
      ...params,
    },
  });
}
