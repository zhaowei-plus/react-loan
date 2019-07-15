const Mock = require('mockjs');

module.exports = {
  '/api/loan/action/bidContractRecords': () => {
    return Mock.mock({
      error: '错误',
      result: {
        data: [
          {
            'id|+1': 1,
            customerName: '这是供应商名称1',
            merge: 1,
            code: '1111111111111',
            projectName: '这是项目名称1',
            amount: 1000000,
            'status|1': [1, 2],
            'statusDesc|1': ['已备案', '备案撤回申请中'],
            // detailUrl: 'http://www.baidu.com',
            // announceUrl: 'http://www.baidu.com',
          }, {
            'id|+1': 2,
            customerName: '这是供应商名称1',
            merge: 1,
            code: '1111111111111',
            projectName: '这是项目名称1',
            amount: 1000000,
            'status|1': [1, 2],
            'statusDesc|1': ['已备案', '备案撤回申请中'],
            // detailUrl: 'http://www.baidu.com',
            // announceUrl: 'http://www.baidu.com',
          }, {
            'id|+1': 3,
            customerName: '这是供应商名称2',
            merge: 2,
            code: '1111111111111',
            projectName: '这是项目名称2',
            amount: 1000000,
            'status|1': [1, 2],
            'statusDesc|1': ['已备案', '备案撤回申请中'],
            // detailUrl: 'http://www.baidu.com',
            // announceUrl: 'http://www.baidu.com',
          }, {
            'id|+1': 4,
            customerName: '这是供应商名称3',
            merge: 2,
            code: '1111111111111',
            projectName: '这是项目名称2',
            amount: 1000000,
            'status|1': [1, 2],
            'statusDesc|1': ['已备案', '备案撤回申请中'],
            // detailUrl: 'http://www.baidu.com',
            // announceUrl: 'http://www.baidu.com',
          },
        ],
        total: 4,
      },
      success: true,
    });
  },

  '/api/loan/action/bidProjectRecords': () => {
    return Mock.mock({
      success: true,
      error: '123',
      result: {
        'data|15': [{
          'id|+1': 1,
          bizTypeDesc: '项目采购',
          customerName: '测试',
          enterStatusDesc: '未注册',
          projectName: '这是项目名称',
          itemName: '这是中标标项名称',
          bidTotalAmount: 10000,
          bidTime: 1536587230000,
          purchaseName: '这是采购单位',
          'projectStatusDesc|1': [1, 2, 3, 4, 5],
          'financeStatus|1': [1, 2, 3, 4],
          notificationUrl: 'http://www.baidu.com',
          announcementUrl: 'http://www.baidu.com',
          supplierId: '111',
        }],
      },
    });
  },
  '/api/loan/action/bidContractRecords/list': () => {
    return Mock.mock({
      success: true,
      error: '123',
      result: {
        'data|15': [{
          'id|+1': 1,
          supplierName: '浙江省xxx公司',
          supplierId: 12123,
          certificateNo: '12312323123123',
          actionName: '@ctitle',
          'actionType|1': [1, 2, 3, 4, 5],
          createTime: 1536587230000,
          operatorName: '@cname',
          operatorId: 12,
          operatorAccount: 'uweeywiqye12312',
          'status|1': [0, 1],
          // processStatus: 1,
          'loanStatus|1': [0, 1],
        }],
      },
    });
  },
};
