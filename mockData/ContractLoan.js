const Mock = require('mockjs')

module.exports = {
  '/api/loan/supplier/purchaseUnit': () => {
    return Mock.mock({
      "success|1-1": true,
      "result|1-50": [
        {
          "key|+1": 1,
          "type|+1": 1,
          "name": "中国农业银行",
        }
      ],
      "error": "获取采购单位错误"
    });
  },
  '/api/loan/supplier/bidProjectRecords': () => {
    return Mock.mock({
      "success": true,
      "result": {
        "data|5-10": [
          {
            "id|+1": 1,
            "bidTime": "2018-12-12 12:12:12",
            "bidTotalAmount": 38008,
            "bizTypeCode": "业务类型编码",
            "bizTypeDesc": "业务类型描述",
            "customerName": "供应商名称",
            "enterStatusDesc": "入住状态描述",
            "financeStatus|1": [1, 2],
            "financeStatusDesc": "融资状态描述",
            "projectName": "项目名称",
            "projectStatus|1": [1, 2, 3, 4, 5],
            "projectStatusDesc": "项目状态描述",
          },
        ],
        "total": 10,
      },
      "error": "获取中标项目记录错误"
    });
  },
  '/api/loan/supplier/bidContractRecords': () => {
    return Mock.mock({
      "success": true,
      "result": {
        "data": [
          {
            "code": "@word",
            "amount": 100000,
            "announceUrl": "www.baidu.com",
            "customerName": "供应商名称",
            "detailUrl": "www.baidu.com",
            "projectName": "项目名称1",
            "status|1": [1, 2],
            "statusDesc|1": ["已备案描述 ", "备案撤销申请中"],
          }, {
            "code": "@word",
            "amount": 100000,
            "announceUrl": "www.baidu.com",
            "customerName": "供应商名称",
            "detailUrl": "www.baidu.com",
            "projectName": "项目名称1",
            "status|1": [1, 2],
            "statusDesc|1": ["已备案描述 ", "备案撤销申请中"],
          }, {
            "code": "@word",
            "amount": 100000,
            "announceUrl": "www.baidu.com",
            "customerName": "供应商名称",
            "detailUrl": "www.baidu.com",
            "projectName": "项目名称2",
            "status|1": [1, 2],
            "statusDesc|1": ["已备案描述 ", "备案撤销申请中"],
          }, {
            "code": "@word",
            "amount": 100000,
            "announceUrl": "www.baidu.com",
            "customerName": "供应商名称",
            "detailUrl": "www.baidu.com",
            "projectName": "项目名称2",
            "status|1": [1, 2],
            "statusDesc|1": ["已备案描述 ", "备案撤销申请中"],
          }, {
            "code": "@word",
            "amount": 100000,
            "announceUrl": "www.baidu.com",
            "customerName": "供应商名称",
            "detailUrl": "www.baidu.com",
            "projectName": "项目名称3",
            "status|1": [1, 2],
            "statusDesc|1": ["已备案描述 ", "备案撤销申请中"],
          },
        ],
        "total": 10,
      },
      "error": "获取中标合同备案列表错误"
    });
  },
  '/api/loan/supplier/contractRecords': () => {
    return Mock.mock({
      "success|1-1": true,
      "result": {
        "data|5-10": [
          {
            "id|+1": 1,
            "type|+1": 1,
            "name": "中国农业银行",
            "projectInfo": {
              "name": "这里是项目名称",
              "itemName": "这里是标项名称",
              "amount": 6000000,
              "time": 1554275123000
            },
            "purchaseUnit": "这里是机构名称",
            "projectStatus|1-4": 1,
            "status|1-4": 1
          },
        ],
        "total": 10,
      },
      "error": "获取中标项目记录错误"
    });
  },
}

