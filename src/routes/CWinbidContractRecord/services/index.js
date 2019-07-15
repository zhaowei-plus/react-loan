import { request } from 'doraemon';

const urls = {
  contractRecord: '/api/loan/supplier/bidContractRecords', // 中标合同备案记录
};

export async function reqContractRecord(params) {
  return request(urls.contractRecord, {
    params,
  });
}
