import { request } from 'doraemon';

// 查询供应商贷款申请记录详情
export async function reqLoanApplyDetail(params) {
  return request('/api/loan/supplier/applyRecord/detail', {
    params,
  });
}
