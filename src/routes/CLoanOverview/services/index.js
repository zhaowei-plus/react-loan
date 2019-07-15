import { request } from 'doraemon';

const urls = {
  accountInfo: '/api/loan/account/info',
  helpCenterInfo: '/help-center/api/cors/getRemoteResults?categoryId=318&title=&startPublishDate=&endPublishDate=&pageIndex=1&pageSize=15&url=https%3A%2F%2Fhelp.zcygov.cn%2Fhelp-center%2Fapi%2Ffrequent%2FgetContentList',
  recommend: '/api/loan/account/product/recommend',
  loanAbleBidItem: '/api/loan/account/product/channelAndBid',
  hotRecommend: '/api/loan/account/product/hotRecommend',
  loanAbleBidItems: '/api/loan/account/bidProjectList',
  recommendByBidItem: '/api/loan/account/product/channelAndBid',
};

export async function reqAccountInfo(params) {
  return request(urls.accountInfo, {
    params,
  });
}


export async function reqHelpCenterInfo(params) {
  return request(urls.helpCenterInfo, {
    params,
  });
}

export async function reqRecommend(params) {
  return request(urls.recommend, {
    method: 'GET',
    params,
  });
}


export async function reqHotRecommend(params) {
  return request(urls.hotRecommend, {
    method: 'GET',
    params,
  });
}

export async function reqRecommendByBidItem(params) {
  return request(urls.recommendByBidItem, {
    method: 'GET',
    params,
  });
}

export async function reqLoanAbleBidItems(params) {
  return request(urls.loanAbleBidItems, {
    method: 'GET',
    params,
  });
}

