const Mock = require('mockjs')

module.exports = {
  // '/api/loan/supplier/applyRecords': () => {
  //   return Mock.mock({"success":true,"result":{"total":2,"data":[{"id":10,"customerId":4,"applyCode":"apply_code01","applicant":null,"onlineInitiator":"","applyTime":"","capitalChannel":"capital_channel01","productName":"product_name01","productCategory":null,"productType":null,"applyAmount":null,"approveAmount":null,"annualizedRate":null,"approveTime":null,"customerApplyStatus":1,"contractCode":null},{"id":11,"customerId":4,"applyCode":"apply_code02","applicant":"applicant02","onlineInitiator":"","applyTime":"2019-02-28 11:56:01","capitalChannel":"capital_channel02","productName":"product_name02","productCategory":null,"productType":null,"applyAmount":1000,"approveAmount":null,"annualizedRate":null,"approveTime":null,"customerApplyStatus":1,"contractCode":null}],"pageNum":1,"pageSize":10,"pages":1,"size":2},"error":null});
  // },
  '/api/loan/supplier/loanRecods': () => {
    return Mock.mock({
      "success": true,
      "result|6-50": [
        {
          "customerName": "浙江XXXX有限公司",
          "id|+1": 1,
          "loanCode": "XXXXXXXXX",
          "loanInfo": {
            "annualizedRate": 4.1,
            "duration": 6,
            "loanAmount": 2000000,
            "restAmount": 1000000,
            "status|1-5": 1,
            "time": "2017-12-12 12:12:12",
          },
          "projectInfo": {
            "channelName": "中国农业银行杭州支行",
            "channelProductName": "小微网贷",
            "contractCode": "XVJUWUEYUY",
          },
          "repaymentInfo": {
            "repaymentAccount": "中国农业银行  6222 2222 2222 2222",
            "repaymentDate": 11,
            "repaymentType": "每月付息到期还本",
            "restPeriod": 10,
            "startEndTime": " 2018-12-12 至 2019-06-12",
            "totalPeriod": 12,
          },
        },
      ],
      "success": true
    });
  },
  '/api/loan/supplier/applyRecord/detail': () => {
    return Mock.mock({
      "success": true,
      "result": {
        "id": null,
        "applyInfo": {
          "amount": 1000,
          "applicant": "applicant03",
          "cardNo": "123456789",
          "onlineInitiator": "",
          "onlinePhoneNo": "",
          "phoneNo": "12345678",
          "time": "2019-02-28 00:00:00",
          "applyApprover": "applyApprover03",
          "result": 1,
          "remark": "remark03",
          bidProjectCode: 'ASDASDASDASDASD',
          bidProjectName: '这里是项目名称',
          bidTotalAmount: 10000000,
        },
        "customerInfo": {
          "customerName": "浙江省直同人建设有限公司",
          "customerType": "批发代理",
          "cardType": 1,
          "cardNo": "",
          "customerId": 4
        },
        "approveInfo": {
          "amount": 1000,
          "annualizedRate": 54545,
          "applyStatus": 2,
          "contractCode": "contractCode03",
          "time": "2019-02-28 00:00:00",
          "remark": "remark03",
          "result": 1,
          "approver": "approver03"
        },
        "contractInfo": {
          "name": ""
        },
        "estimateInfo": {
          "result": 1,
          "resultAmount": 1000,
          "time": "2019-02-28 00:00:00"
        },
        "projectInfo": {
          "applyCode": "apply_code03",
          "projectStatus": 70,
          "channelName": null,
          "channelProductCode": null,
          "channelProductName": null,
          "channelProductNo": null,
          "endTime": "2019-02-28 00:00:00",
          "executor": "农业银行",
          "projectName": null,
          "projectSource": null,
          "startTime": "2019-02-28 11:57:03",
          "contractCode": null,
          "productId": 1000
        }
      },
      "error": null
    });
  },
  '/api/loan/supplier/quotaRecords': () => {
    return Mock.mock({"success":true,"result":{"total":4,"data":[{"id":1,"contractCode":"contract_code03","customerName":"customer_name03","creditInstitution":"credit_institution03","capitalChannel":"credit_institution03","productName":"product_name03","quotaType":1,"annualizedRate":3444,"quota":1000,"availableQuota":1000,"duration":9,"startTime":"2019-02-28","endTime":"2019-02-28","rateType":1,"floatRate":0,"status":2},{"id":3,"contractCode":"contract_code05","customerName":"customer_name05","creditInstitution":"credit_institution05","capitalChannel":"credit_institution05","productName":"product_name05","quotaType":1,"annualizedRate":3444,"quota":1000,"availableQuota":1000,"duration":9,"startTime":"2019-02-28","endTime":"2019-02-28","rateType":1,"floatRate":0,"status":2},{"id":4,"contractCode":"contract_code06","customerName":"customer_name06","creditInstitution":"credit_institution06","capitalChannel":"credit_institution06","productName":"product_name06","quotaType":1,"annualizedRate":3444,"quota":1000,"availableQuota":1000,"duration":9,"startTime":"2019-02-28","endTime":"2019-02-28","rateType":1,"floatRate":0,"status":2},{"id":5,"contractCode":"330106110_ht","customerName":"测试一","creditInstitution":"中国农业银行股份有限公司浙江省分行","capitalChannel":"中国农业银行股份有限公司浙江省分行","productName":"流水贷1号","quotaType":1,"annualizedRate":9000,"quota":100000,"availableQuota":97000,"duration":8,"startTime":"2018-11-28","endTime":"2019-07-28","rateType":1,"floatRate":0,"status":1}],"pageNum":1,"pageSize":10,"pages":1,"size":4},"error":null});
  },
  '/api/loan/supplier/repaymentRecods': () => {
    return Mock.mock({
      'error': 'xxx',
      'result': {
        "repaymentPeriod": 2,
        "repaymentRecordROList|12": [
          {
            "currentPeriod|+1": 1,
            "realRepaymentInfo": {
              "account": "中国银行 6222222222222222",
              "date": "2018-12-12",
              "interest": 110000,
              "principal": 110000,
              "totalAmount": 0
            },
            "repaymentStatus|0-4": 0,
            "shouldRepaymentInfo": {
              "date": "2018-12-12",
              "interest": 0,
              "overdueAmount": 0,
              "penalty": 0,
              "principal": 110000,
              "totalAmount": 110000
            }
          }
        ],
        "restAmount": 110000,
        "totalAmount": 110000,
        "totalPeriod": 12
      },
      'success': true,
    });
  },
}
