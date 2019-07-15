import { request } from 'doraemon';

const urls = {
  customerInfoList: '/api/loan/customer/personInfos', // 企业客户档案管理列表
  customerInfoDetail: '/api/loan/customer/personInfo/detail', // 企业客户档案管理详情
  applyRecord: '/api/loan/customer/personInfo/applyRecords', // 申请记录
  limitRecord: '/api/loan/customer/personInfo/quotaRecords', // 额度记录
  borrowRecord: '/api/loan/customer/personInfo/loanRecords', // 借款记录
  repayPlan: '/api/loan/customer/personInfo/repaymentPlans', // 还款计划
  repayHistory: '/api/loan/customer/personInfo/repaymentHistories', // 还款历史
  capitalRecord: '/api/loan/customer/personInfo/capitalFlow', // 资金流水
  orgList: '/api/loan/channel/summary/list', // 审批机构列表
};

export async function reqCustomerInfoList(params) {
  return request(urls.customerInfoList, {
    params,
  });
}

export async function reqCustomerInfoDetail(params) {
  return request(urls.customerInfoDetail, {
    params,
  });
}

export async function reqApplyRecord(params) {
  return request(urls.applyRecord, {
    params,
  });
}

export async function reqLimitRecord(params) {
  return request(urls.limitRecord, {
    params,
  });
}

export async function reqBorrowRecord(params) {
  return request(urls.borrowRecord, {
    params,
  });
}

export async function reqRepayPlan(params) {
  return request(urls.repayPlan, {
    params,
  });
}

export async function reqRepayHistory(params) {
  return request(urls.repayHistory, {
    params,
  });
}

export async function reqCapitalRecord(params) {
  return request(urls.capitalRecord, {
    params,
  });
}

export async function reqOrgList(params) {
  return request(urls.orgList, {
    params,
  });
}
