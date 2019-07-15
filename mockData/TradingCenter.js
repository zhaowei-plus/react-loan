const Mock = require('mockjs');
const _ = require('lodash');

function randomSuccess(res) {
  return Mock.mock({
    success: true,
    result: res || {},
    statusText: '服务出错',
    error: '错误',
  });
}

module.exports = {
  '/api/loan/trade/repaymentPlans': () => {
    return Mock.mock({
      error: '测试内容vn61',
      result: {
        'data|15': [{
          'id|+1': 1,
          loanCode: '212333',
          customerName: '@cname',
          loanInstitution: '中国农业银行',
          productName: '这是产品名称',
          restAmount: 90000,
          startEndTime: 'xxxx年xx月xx日至xxxx年xx月xx日',
          shouldRepaymentInfo: {
            date: 1536587230000,
            principal: 120000,
            interest: 2200,
            totalAmount: 122200,
            penalty: null,
            overdueAmount: null,
            overdueInterest: null,
          },
          'currentPeriod|1': [1, 2, 3, 4, 5, 6, 8, 10, 11, 12],
          repaymentAccount: '中国农业银行 622 3918 6382 3792 239',
          'repaymentStatus|1': [1, 2],
        }],
        total: 15,
      },
      success: true,
    });
  },
  '/api/loan/trade/repaymentHistories': () => {
    return Mock.mock({
      error: '测试内容vn61',
      result: {
        'data|15': [{
          'id|+1': 1,
          loanCode: '212333',
          customerName: '这是客户名称这是客户名称这是客户名称这是客户名称',
          loanInstitution: '中国农业银行',
          productName: '这是产品名称',
          restAmount: 90000,
          startEndTime: 'xxxx年xx月xx日至xxxx年xx月xx日',
          shouldRepaymentInfo: {
            date: 1536587230000,
            principal: 120000,
            interest: 2200,
            totalAmount: 122200,
            penalty: null,
            overdueAmount: null,
            overdueInterest: null,
          },
          realRepaymentInfo: {
            principal: 10000,
            interest: 100,
            totalAmount: 10100,
            date: 1536587230000,
            account: '中国农业银行622 3918 6382 3792 239',
          },
          'period|1': [1, 2, 3, 4, 5, 6, 8, 10, 11, 12],
          'status|1': [1, 2, 3, 4, 5],
        }],
        total: 15,
      },
      success: true,
    });
  },
  '/api/loan/trade/capitalFlow': () => {
    return Mock.mock({
      error: '测试内容vn61',
      result: {
        'data|15': [{
          'id|+1': 1,
          customerName: '@cname',
          tradeTime: 1536587230000,
          'tradeType|1': [1, 2, 3],
          tradeAmount: 10000,
          tradeChannel: '中国农业银行',
          tradeAccount: '中国农业银行 622 3918 6382 3792 239',
          remark: '这是备注',
        }],
        total: 15,
      },
      success: true,
    });
  },
  '/api/loan/trade/quotaRecords': () => {
    return Mock.mock({
      error: '测试内容vn61',
      result: {
        'data|15': [{
          'id|+1': 1,
          contractCode: '12321312312',
          customerName: '@cname',
          creditInstitution: '中国农业银行',
          productName: '这是产品名称',
          'quotaType|1': [1, 2],
          quota: 100000,
          availableQuota: 90000,
          annualizedRate: 2.3,
          'duration|1': [6, 12],
          startEndTime: 'xxxx年xx月xx日至xxxx年xx月xx日',
          rateType: '浮动利率',
          floatRate: '11',
          'status|1': [0, 1],
        }],
      },
      success: true,
    });
  },
  '/api/loan/channel/summary/list': () => {
    return Mock.mock({
      success: true,
      error: '123',
      result: [{
        channelName: '@ctitle',
        id: 1,
        channelCode: '1',
      }, {
        channelName: '@ctitle',
        id: 2,
        channelCode: '2',
      }, {
        channelName: '@ctitle',
        id: 3,
        channelCode: '3',
      }],
    });
  },
  '/api/loan/trade/applyRecords': () => {
    return Mock.mock({
      error: '测试内容vn61',
      result: {
        'data|15': [{
          'id|+1': 1,
          applyCode: '212333',
          customerName: '@cname',
          projectName: '这是项目名称',
          channelName: '这是渠道名称',
          channelProductName: '这是渠道产品名称',
          projectApplyRes: '这是项目申请来源',
          estimateTime: 1536587230000,
          estimateAmount: 1000000,
          applyTime: 1536587230000,
          applyAmount: 100000,
          'projectStatus|1': [10, 20, 30, 40, 41, 50, 60, 61, 70, 80],
          // projectStatus: 10,
          startTime: 1536587230000,
          endTime: 1536587230000,
          approveAmount: 10000,
          annualizedRate: 3.7,
          'applyStatus|1': [1, 2, 3, 4],

          loanInstitution: '中国农业银行',
          productName: '这是产品名称',
          restAmount: 90000,
          startEndTime: 'xxxx年xx月xx日至xxxx年xx月xx日',
          shouldRepaymentInfo: {
            data: 1536587230000,
            principal: 120000,
            interest: 2200,
            totalAmount: 122200,
            penalty: null,
            overdueAmount: null,
            overdueInterest: null,
          },
          'currentPeriod|1': [1, 2, 3, 4, 5, 6, 8, 10, 11, 12],
          repaymentAccount: '中国农业银行 622 3918 6382 3792 239',
          'repaymentStatus|1': [1, 2],
        }],
        total: 15,
      },
      success: true,
    });
  },
  '/api/loan/trade/loanRecords': () => {
    return Mock.mock({
      error: '测试内容vn61',
      result: {
        'data|15': [{
          'id|+1': 1,
          loanCode: '212333',
          customerName: '@cname',
          projectInfo: {
            channelName: '这是渠道名称',
            channelProductName: '这是渠道产品名称',
            contractCode: '111111111111111',
          },
          loanInfo: {
            annualizedRate: 3.7,
            duration: 6,
            loanAmount: 1111111,
            restAmount: 99999,
            time: 1536587230000,
            'status|1': [1, 6, 3, 4, 5],
          },
          repaymentInfo: {
            restPeriod: 6,
            totalPeriod: 12,
            'repaymentType|1': [1, 2, 3, 4, 5],
            repaymentDate: '11号',
            repaymentAccount: '中国农业银行   622 2820 2399 3800 998',
            startEndTime: '2018-12-12 至 2019-06-12',
          },
        }],
        total: 15,
      },
      success: true,
    });
  },
  '/api/loan/trade/customerInvitation': () => {
    return randomSuccess();
  },
  '/api/loan/trade/approveRecords': () => {
    return Mock.mock({
      error: '测试内容vn61',
      'result|2': [{
        'id|+1': 1,
        approveTime: 1536587230000,
        approver: '@cname',
        'projectStatus|1': [10, 20, 30, 40, 41, 50, 60, 61, 70, 80],
        remark: '这是审批意见',
        result: 1,
      }],
      success: true,
    });
  },
  '/api/loan/trade/applyRecord/detail': () => {
    return Mock.mock({
      success: true,
      error: '123',
      result: {
        'id|+1': 1,
        'type|1': [1, 2],
        customerInfo: {
          customerName: '这是客户名称',
          customerNo: '2123',
          customerType: 1,
          cardType: 1,
          cardNo: '13291373017931237',
          id: 1,
        },
        contractInfo: {
          name: '第三方协议名称',
        },
        projectInfo: {
          applyCode: 'xxxx-123123',
          executor: '@cname',
          projectName: '浙江省触角有限公司2017年9月12日(小微网贷流程)',
          channelName: '中国农业银行杭州西湖支行',
          'projectStatus|1': [10, 20, 30, 40, 41, 50, 60, 61, 70, 80],
          channelProductName: '小微网贷',
          projectSource: '政采云精品推荐',
          channelProductCode: 'NHXWWD',
          startTime: 1536587230000,
          channelProductNo: '农行-浙-XD-小微网贷',
          endTime: 1536887230000,
          id: 1,
        },
        applyInfo: {
          time: 1536587230000,
          phoneNo: '159372934729',
          amount: 160000,
          onlineInitiator: '@cname',
          cardNo: '220373472937492747',
          onlinePhoneNo: '1603738429',
          applicant: '@cname',
          bidProjectCode: '111111111111111111111',
          bidProjectName: '这是中标项目名称',
          bidTotalAmount: 999999999,
        },
        estimateInfo: {
          time: 1536587230000,
          result: '通过',
          resultAmount: 160000,
        },
        approveInfo: {
          applyStatus: '已申请',
          contractCode: '5382619',
          finishTime: 1536987230000,
          amount: 1836334,
          result: '通过',
          annualizedRate: '0.07',
          remark: '这是审批意见',
          productName: '这是审批产品名称',
        },
      },
    });
  },
  '/api/loan/trade/repaymentRecords': () => {
    return Mock.mock({
      error: '测试内容vn61',
      result: [{
        'id|+1': 1,
        'period|+1': 1,
        realRepaymentInfo: {
          account: '662 2829 1971 1298 111',
          date: 1536887230000,
          interest: 0.3,
          principal: 111111,
          totalAmount: 111111,
        },
        'repaymentStatus|1': [1, 2, 3, 4, 5, 6],
        restAmount: 10000000,
        shouldRepaymentInfo: {
          date: 1536887230000,
          interest: 0.09,
          overdueInterest: 7.0,
          overdueAmount: 211111,
          penalty: 99999,
          principal: 22222222,
          totalAmount: 11111111,
        },
        startEndTime: '2018-12-12 至 2019-06-12',
      }],
      success: true,
    });
  },
};
