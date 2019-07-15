const Mock = require('mockjs');

function randomSuccess() {
  return Mock.mock({
    result: {},
    'success|1': true,
    error: '错误信息',
  });
}

module.exports = {
  '/api/loan/product/basis/list': function () {
    return Mock.mock({
      result: {
        'data|1-10': [{
          remark: '@ctitle',
          name: '@ctitle',
          channelName: '@ctitle',
          createTime: '@date',
          refNum: 10,

          id: /^\d{6,10}$/,
        }],
        total: 100,
      },
      success: true,
    });
  },
  '/api/loan/product/basis/config': () => {
    return randomSuccess();
  },
  '/api/prodPutOff': () => {
    return randomSuccess();
  },
  '/api/loan/product/channel/supplier': () => {
    return Mock.mock({
      'result|1-100': [{
        name: '@ctitle',
        id: /^\d{6,10}$/,
      }],
      success: true,
    });
  },
  '/api/loan/product/basis/toll': () => {
    return Mock.mock({
      'result|1-100': [{
        name: '@ctitle',
        id: /^\d{6,10}$/,
      }],
      success: true,
    });
  },
  '/api/loan/product/basis': () => {
    return Mock.mock({
      result: {
        banner: {
          bannerDetail: [{ districtCode: '120000', code: [], isAll: true }],
          bannerShow: [{ show: 1, sort: 2 }],
        },
        productBasis: {
          applyLimit: 32,
          creditLeft: 1200,
          creditRight: 32300,
          defaultRepayment: { rateNum: '32', type: 2 },
          modelHead: 1,
          modelYear: 2,
          overdue: { rateNum: '12', type: 3 },
          repayment: [1, 3, 2],
          repaymentCycle: { type: 6, val: '12' },
          repaymentDay: 1,
        },
        productBrief: {
          businessCategory: 1,
          category: 1,
          description: '产品描述',
          code: '渠道产品编号',
          loop: true,
          note: '23注意事项',
          num: '渠道产品代码',
          problem: '432常见问题',
          subtitle: '副标题',
          name: '渠道产品名称',
          process: 1,
          types: 1,
          bigImage: [{
            fileId: '1089PT/330108/100012122/20192/b70bcba0-5557-476a-8623-b01cdbbc9c1a',
            fileType: 'image/jpeg',
            name: '7cce0efbly1fntqbu5m8nj20j60j6gn7.jpg',
          }],
          smallImage: [{
            fileId: '1089PT/330108/100012122/20192/74dbcf9f-02df-4d99-b6ce-898f96e5fa88',
            fileType: 'image/jpeg',
            name: '7cce0efbly1fntqbuoauej20j60j6wfk.jpg',
          }],
        },
        productCondition: [],
        productProtocol: [{ bNode: 1, types: 1 }],
        productRateList: [{ deadLine: 32, monthRate: '32' }],
        productTollList: [{ types: 1, node: 1 }],
      },
      success: true,
    });
  },
};
