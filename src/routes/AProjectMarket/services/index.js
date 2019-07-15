import { request } from 'doraemon';

const urls = {
  projectMarketList: '/api/loan/action/bidProjectRecords', // 中标项目营销列表
};

export async function reqProjectMarketList(params) {
  return request(urls.projectMarketList, {
    params,
  });
}
