import { request } from 'doraemon';

// 查询供应商额度记录
export async function reqLimitRecord(params) {
  return request('/api/loan/supplier/quotaRecords', {
    params,
  });
}
