import { request } from 'doraemon';

const urls = {
  repayPlanList: '/api/loan/trade/repaymentPlans', // 还款计划列表
  repayHistoryList: '/api/loan/trade/repaymentHistories', // 还款历史列表
  capitalRecordList: '/api/loan/trade/capitalFlow', // 资金流水列表
  limitRecordList: '/api/loan/trade/quotaRecords', // 额度记录列表
  channelNameList: '/api/loan/channel/summary/list', // 渠道名称列表
};

export async function reqRepayPlanList(params) {
  return request(urls.repayPlanList, {
    params,
  });
}

export async function reqRepayHistoryList(params) {
  return request(urls.repayHistoryList, {
    params,
  });
}

export async function reqCapitalRecordList(params) {
  return request(urls.capitalRecordList, {
    params,
  });
}

export async function reqLimitRecordList(params) {
  return request(urls.limitRecordList, {
    params,
  });
}

export async function reqChannelNameList(params) {
  return request(urls.channelNameList, {
    params,
  });
}
