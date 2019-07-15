import { request } from 'doraemon';

// 服务费账单列表
export async function reqServiceCharge(params) {
  return request('/api/loan/service/bill/list', {
    params,
  });
}
