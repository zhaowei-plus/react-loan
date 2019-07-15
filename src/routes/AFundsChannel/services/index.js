import { request } from 'doraemon';

// 渠道列表
export async function reqFundsChannelList(params) {
  return request('/api/loan/channel/list', {
    params,
  });
}

// 更改渠道状态
export async function reqHandleChannel(params) {
  return request('/api/loan/channel/status', {
    method: 'PUT',
    params,
  });
}
