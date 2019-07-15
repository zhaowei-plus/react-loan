import { request } from 'doraemon';

const urls = {
  contractRecordList: '/api/loan/action/bidContractRecords', // 合同备案列表
};

export async function reqContractRecord(params) {
  return request(urls.contractRecordList, {
    params,
  });
}
