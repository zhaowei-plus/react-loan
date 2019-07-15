import { stringify } from 'qs';
import { request } from 'doraemon';

export async function checkUrlPermission(params) {
  return request(`/user/privileges/isResourcePermit?${stringify(params)}`);
}

export async function checkPagePermission(params) {
  return request(`/api/privileges/getElements?${stringify(params)}`);
}

// 查询审批机构
export async function reqApprovalOrg(params) {
  return request('/api/loan/channel/summary/list', {
    params,
  });
}
