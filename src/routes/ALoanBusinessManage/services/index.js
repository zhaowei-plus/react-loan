import { request } from 'doraemon';

const urls = {
  loanApplyList: '/api/loan/trade/applyRecords', // 贷款申请列表
  borrowRecordList: '/api/loan/trade/loanRecords', // 借款记录列表
  channelList: '/api/loan/channel/summary/list', // 资方渠道列表
  inviteCustomer: '/api/loan/trade/customerInvitation', // 邀请客户
  approveRecord: '/api/loan/trade/approveRecords', // 审批记录
  businessDetail: '/api/loan/trade/applyRecord/detail', // 贷款申请详情
  repayConditionList: '/api/loan/trade/repaymentRecords', // 还款情况列表
};

export async function reqLoanApplyList(params) {
  return request(urls.loanApplyList, {
    params,
  });
}

export async function reqBorrowRecordList(params) {
  return request(urls.borrowRecordList, {
    params,
  });
}

export async function reqChannelList(params) {
  return request(urls.channelList, {
    params,
  });
}

export async function reqInviteCustomer(params = {}) {
  return request(urls.inviteCustomer, {
    method: 'POST',
    data: params,
  });
}

export async function reqApproveRecord(params) {
  return request(urls.approveRecord, {
    params,
  });
}

export async function reqBusinessDetail(params) {
  return request(urls.businessDetail, {
    params,
  });
}

export async function reqRepayConditionList(params) {
  return request(urls.repayConditionList, {
    params,
  });
}
