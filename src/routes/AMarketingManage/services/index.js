import { request } from 'doraemon';

const urls = {
  actionList: '/api/loan/action/list', // 营销中心列表
  dealList: '/api/loan/action/deal/list', // 人工处理记录列表
  dealEdit: '/api/loan/action/deal/edit', // 编辑处理结果
};
export async function reqMarketingManageList(params) {
  return request(urls.actionList, {
    params,
  });
}

export async function reqManualHandleRecordList(params) {
  return request(urls.dealList, {
    params,
  });
}

export async function reqChangeResult(params = {}) {
  return request(urls.dealEdit, {
    method: 'POST',
    data: params,
  });
}

