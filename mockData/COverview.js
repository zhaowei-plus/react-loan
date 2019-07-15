const Mock = require('mockjs');

function randomSuccess() {
  return Mock.mock({
    result: {},
    'success|1': true,
    error: '错误信息',
  });
}

module.exports = {
  '/api/loan/account/help': function () {
    return Mock.mock(
      {
        error: '测试内容r6l0',
        result: {
          code: '测试内容85a1',
          explainString: '测试内容gg4r',
          loanHelp: [
            {
              content: '测试内容j12p',
              title: '测试内容sy2e',
            },
          ],
        },
        success: true,
      }
    );
  },
  '/api/loan/account/info': () => {
    return Mock.mock({
      error: '测试内容33td',
      result: {
        accountInfo: {
          avatar: '测试内容r3jk',
          integrityScore: 18313,
          lastDueDate: '@Date',
          monthShouldReturn: 22633,
          totalBorrow: 10647,
          totalRepayment: 76543,
          totalToPay: 14578,
          userName: '测试内容mbdq',
        },
        'userLoanInfo|3': [
          {
            'applicationStatus|1': [1, 0],
            availableQuota: 100000000,
            capitalChannel: '中国农业银行',
            loanAmount: 1000000,
            productName: '小微网贷',
          },
        ],
      },
      success: true,
    });
  },
  '/api/loan/account/product/recommend': () => {
    return Mock.mock(
      {
        error: '测试内容485r',
        result: [
          {
            channelName: '中国农业银行',
            name: '小微网贷',
            id: 1,
          },
        ],
        success: true,
      },
    );
  },
  '/api/loan/front/product': () => {
    return Mock.mock({
      result: {
        amount: 76307,
        bigImage: 34470,
        condition: [
          '条件1',
          '条件2',
          '条件3',
        ],
        discount: 46872,
        note: '测试内容dggt',
        oldAmount: 21434,
        problem: '3434343',
        smallImage: 15266,
      },
      success: true,
    });
  },
  '/api/loan/front/product/applyCalculate': () => {
    return Mock.mock({
      error: '测试内容hg95',
      result: {
        'data|1-20': [
          {
            bidTime: '@date',
            bidTotalAmount: 52475,
            id: /^\d{6,10}$/,
            projectCode: /^\d{6,10}$/,
            projectName: '测试内容2dz2',
          },
        ],
        pageNo: 1,
        pageSize: 18688,
        total: 20,
      },
      success: true,
    });
  },
  '/api/loan/account/product/hotRecommend': () => {
    return Mock.mock(
      {
        error: '测试内容822h',
        'result|1-5': [
          {
            id: /^\d{6,10}$/,
            smallImage: '@name',
          },
        ],
        success: false,
      }
    );
  },
  '/api/loan/account/bidProjectList': () => {
    return Mock.mock(
      {
        error: '测试内容d3j2',
        'result|4-10': [
          {
            bidTime: /^\d{6,10}$/,
            bidTotalAmount: /^\d{6,10}$/,
            distCode: /^\d{6,10}$/,
            projectCode: /^\d{6,10}$/,
            projectName: '@name',
          },
        ],
        success: true,
      }
    );
  },
  '/api/loan/front/product/applyCalculate/getProject':()=>{
    return Mock.mock(
      {
        error: '测试内容d3j2',
        'result':{
          'data|5-20':[
            {
              bidTime: /^\d{6,10}$/,
              bidTotalAmount: /^\d{6,10}$/,
              distCode: /^\d{6,10}$/,
              projectCode: /^\d{6,10}$/,
              projectName: '@name',
            },
          ],
        },
        success: true,
      }
    );
  }
};
