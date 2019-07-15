import { request } from 'doraemon';

const urls = {
  statistics: '/api/loan/statistics/history',
  week: '/api/loan/statistics/week',
  applyList: '/api/loan/statistics/apply/list',
  clearTest: '/api/loan/statistics/testData',

};

export async function reqStatistics(params) {
  return request(urls.statistics, {
    params,
  });
}


export async function reqWeekData(params) {
  return request(urls.week, {
    params,
  });
}


export async function reqApplyList(params) {
  return request(urls.applyList, {
    params,
  });
}


export async function reqClearTest(params) {
  return request(urls.clearTest, {
    method: 'delete',
    params,
  });
}
