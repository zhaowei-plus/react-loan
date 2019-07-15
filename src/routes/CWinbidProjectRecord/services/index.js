import { request } from 'doraemon';

const urls = {
  projectRecord: '/api/loan/supplier/bidProjectRecords', // 中标项目记录
};

export async function reqProjectRecord(params) {
  return request(urls.projectRecord, {
    params,
  });
}
