const Mock = require('mockjs');

function randomSuccess() {
  return Mock.mock({
    result: {},
    'success|1': true,
    error: '错误信息',
  });
}

module.exports = {
  '/api/loan/product/condition/list': function () {
    return Mock.mock({
      'result|1-10': [{
        remark: '@ctitle',
        name: '@ctitle',
        id: /^\d{6,10}$/,
        'isSystem|1': true,
      }],
      success: true,
    });
  },
  '/api/loan/product/basis/config': () => {
    return randomSuccess();
  },
  '/api/prodPutOff': () => {
    return randomSuccess();
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
  '/api/loan/product/channel/detail': () => {
    return Mock.mock({
      result: {
        banner: {
          bannerDetail: [],
          bannerShow: [
            {
              show: 1,
              sort: '',
            },
          ],
        },
        applyLimit: 32,
        creditLeft: 200,
        name: '基础名称',
        creditRight: 3200,
        defaultRepayment: {
          rateNum: '32',
          type: 2,
        },
        modelHead: 1,
        modelYear: 2,
        overdue: {
          rateNum: '23',
          type: 2,
        },
        repayment: [
          1,
          3,
          2,
        ],
        repaymentCycle: {
          type: 1,
        },
        repaymentDay: 1,
        businessCategory: 1,
        category: 1,
        description: '产品描述',
        channel: {
          channelName: '中国银行',
          channelCode: '123',
          id: '123',
          channelId: '123',
        },
        code: '渠道产品编号',
        loop: true,
        note: '23注意事项',
        num: '渠道产品代码',
        problem: '432常见问题',
        subtitle: '副标题',
        process: 1,
        types: 1,
        bigImage: [
          {
            fileId: '1089PT/null/1/20193/301df2d2-0b62-4fb5-8bac-5c7aab6d4fea',
            fileType: 'image/jpeg',
            name: '7cce0efbly1fntqbv2542j20j60j6dhn.jpg',
          },
        ],
        smallImage: [
          {
            fileId: '1089PT/null/1/20193/0588ce5f-1353-4605-b76f-1a3ea75e1fff',
            fileType: 'image/jpeg',
            name: '7cce0efbly1fntqbu5m8nj20j60j6gn7.jpg',
          },
        ],
        productCondition: [
          {
            remark: '十更广行究',
            name: '生层便起十正',
            id: '6826174',
            isSystem: false,
          },
          {
            remark: '务制他运',
            name: '光酸感当酸',
            id: '8328725',
            isSystem: false,
          },
        ],
        productProtocol: [
          {
            bNode: 1,
            types: 1,
          },
        ],
        productRateList: [
          {
            deadLine: 3,
            monthRate: '32',
            channelName: '中国银行',
          },
        ],
        productTollList: [
          {
            types: '214023288',
            tNode: 1,
          },
        ],
      },
      success: true,
    });
  },
  '/api/loan/product/basis/detail': () => {
    return Mock.mock({
      result: {
        banner: {
          bannerDetail: [],
          bannerShow: [
            {
              show: 1,
              sort: '',
            },
          ],
        },
        applyLimit: 32,
        creditLeft: 200,
        creditRight: 3200,
        defaultRepayment: {
          rateNum: '32',
          type: 2,
        },
        modelHead: 1,
        modelYear: 2,
        overdue: {
          rateNum: '23',
          type: 2,
        },
        repayment: [
          1,
          3,
          2,
        ],
        repaymentCycle: {
          type: 1,
        },
        repaymentDay: 1,
        businessCategory: 1,
        category: 1,
        description: '产品描述',
        channel: {
          channelName: '中国银行',
          channelCode: '123',
          id: '123',
          channelId: '123',
        },
        code: '渠道产品编号',
        loop: true,
        note: '23注意事项',
        num: '渠道产品代码',
        problem: '432常见问题',
        subtitle: '副标题',
        process: 1,
        types: 1,
        bigImage: {
          fileId: '1089PT/null/1/20193/301df2d2-0b62-4fb5-8bac-5c7aab6d4fea',
          fileType: 'image/jpeg',
          name: '7cce0efbly1fntqbv2542j20j60j6dhn.jpg',
        },
        smallImage: {
          fileId: '1089PT/null/1/20193/0588ce5f-1353-4605-b76f-1a3ea75e1fff',
          fileType: 'image/jpeg',
          name: '7cce0efbly1fntqbu5m8nj20j60j6gn7.jpg',
        },
        productCondition: [
          {
            remark: '十更广行究',
            name: '生层便起十正',
            id: '6826174',
            isSystem: false,
          },
          {
            remark: '务制他运',
            name: '光酸感当酸',
            id: '8328725',
            isSystem: false,
          },
        ],
        productProtocol: [
          {
            bNode: 1,
            types: 1,
          },
        ],
        productRateList: [
          {
            deadLine: 3,
            monthRate: '32',
            channelName: '中国银行',
          },
        ],
        productTollList: [
          {
            types: '214023288',
            tNode: 1,
          },
        ],
      },
      success: true,
    });
  },
  '/api/loan/product/basis': () => {
    return Mock.mock({
      result: {
        banner: {
          bannerDetail: [],
          bannerShow: [
            {
              show: 1,
              sort: '',
            },
          ],
        },
        applyLimit: 32,
        creditLeft: 200,
        creditRight: 3200,
        defaultRepayment: {
          rateNum: '32',
          type: 2,
        },
        modelHead: 1,
        modelYear: 2,
        overdue: {
          rateNum: '23',
          type: 2,
        },
        repayment: [
          1,
          3,
          2,
        ],
        repaymentCycle: {
          type: 1,
        },
        repaymentDay: 1,
        businessCategory: 1,
        category: 1,
        description: '产品描述',
        channel: {
          channelName: '中国银行',
          channelCode: '123',
          id: '123',
          channelId: '123',
        },
        code: '渠道产品编号',
        loop: true,
        note: '23注意事项',
        num: '渠道产品代码',
        problem: '432常见问题',
        subtitle: '副标题',
        process: 1,
        types: 1,
        bigImage: {
          fileId: '1089PT/null/1/20193/301df2d2-0b62-4fb5-8bac-5c7aab6d4fea',
          fileType: 'image/jpeg',
          name: '7cce0efbly1fntqbv2542j20j60j6dhn.jpg',
        },
        smallImage:
          {
            fileId: '1089PT/null/1/20193/0588ce5f-1353-4605-b76f-1a3ea75e1fff',
            fileType: 'image/jpeg',
            name: '7cce0efbly1fntqbu5m8nj20j60j6gn7.jpg',
          },
        productCondition: [
          {
            remark: '十更广行究',
            name: '生层便起十正',
            id: '6826174',
            isSystem: false,
          },
          {
            remark: '务制他运',
            name: '光酸感当酸',
            id: '8328725',
            isSystem: false,
          },
        ],
        productProtocol: [
          {
            bNode: 1,
            types: 1,
          },
        ],
        productRateList: [
          {
            deadLine: 3,
            monthRate: '32',
            channelName: '中国银行',
          },
        ],
        productTollList: [
          {
            types: '214023288',
            node: 1,
          },
        ],
      },
      success: true,
    });
  },
  '/api/loan/channel/summary/list': () => {
    return Mock.mock({
      result: [{
        channelName: '中国银行',
        channelCode: '123',
        id: '123',
      }],
      success: true,
    });
  },
  '/api/loan/product/processName': () => {
    return Mock.mock({
      'result|5': [{
        process: '@ctitle',
        'id|1': [1,2,3,4,5]
      }],
      success: true,
    });
  },
  '/api/loan/product/productType': () => {
    return Mock.mock({
      'result|5': [{
        types: '@ctitle',
        'id|1': [1,2,3,4,5]
      }],
      success: true,
    });
  },
};
