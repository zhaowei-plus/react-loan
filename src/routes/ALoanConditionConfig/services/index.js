import { request } from 'doraemon';


const urls = {
  condition: ' /api/loan/product/condition',
  updateCondition: '/api/loan/product/condition',

};
export async function reqConditionList(params) {
  return request(urls.condition, {
    params,
  });
}


export async function reqUpdateCondition({ method, data }) {
  return request(urls.updateCondition, {
    method,
    data,
  });
}
