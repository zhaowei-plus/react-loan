import { request } from 'doraemon';

// 查询供应商贷款申请记录
export async function reqApplyRecord(params) {
  return request('/api/loan/supplier/applyRecords', {
    params,
  });
}
