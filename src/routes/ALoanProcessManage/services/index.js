import { request } from 'doraemon';

const urls = {
  synthesisList: '/api/loan/riskMgmt/curStatusRecords', // 综合监控列表
  workbenchList: '/api/loan/riskMgmt/statusRecords', // 工作台监控列表
  synthesisDetail: '/api/loan/riskMgmt/curStatusRecord/detail', // 综合监控详情
  workbenchDetail: '/api/loan/riskMgmt/statusRecord/detail', // 工作台监控详情
};

export async function reqSynthesisList(params) {
  return request(urls.synthesisList, {
    params,
  });
}

export async function reqWorkbenchList(params) {
  return request(urls.workbenchList, {
    params,
  });
}

export async function reqSynthesisDetail(params) {
  return request(urls.synthesisDetail, {
    params,
  });
}

export async function reqWorkbenchDetail(params) {
  return request(urls.workbenchDetail, {
    params,
  });
}

