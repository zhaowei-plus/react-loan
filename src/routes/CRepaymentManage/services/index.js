import { request } from 'doraemon';

// 查询供应商还款计划
export async function reqRepaymentPlan(params) {
  return request('/api/loan/supplier/repaymentPlans', {
    params,
  });
}

// 查询供应商还款历史
export async function reqRepaymentHistory(params) {
  return request('/api/loan/supplier/repaymentHistories', {
    params,
  });
}
