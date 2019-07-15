import { request } from 'doraemon';

const urls = {
  list: '/api/loan/riskMgmt/riskRecords', // 列表
  detail: '/api/loan/riskMgmt/riskRecord/detail', // 详情
  approve: '/api/loan/riskMgmt/riskRecord/approval', // 审批
};

export async function reqList(params) {
  return request(urls.list, {
    params,
  });
}

export async function reqRemind(params) {
  return request(urls.remind, {
    params,
  });
}

export async function reqDelete(params) {
  return request(urls.delete, {
    params,
  });
}

export async function reqDetail(params) {
  return request(urls.detail, {
    params,
  });
}

export async function reqApprove(params = {}) {
  return request(urls.approve, {
    method: 'POST',
    data: params,
  });
}
