import { request } from 'doraemon';


const urls = {
  basicProd: '/api/loan/product/basis',
};
export async function reqBasicProdList(params) {
  return request(urls.basicProd, {
    params,
  });
}

