import { request } from 'doraemon';

// 查询供应商借款记录
export async function reqLoanRecord(params) {
  return request('/api/loan/supplier/loanRecords', {
    params,
  });
}

// 查询供应商还款明细
export async function reqLoanDetail(params) {
  return request('/api/loan/supplier/repaymentRecords', {
    params,
  });
}
