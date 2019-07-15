const Mock = require('mockjs');

function randomSuccess() {
  return Mock.mock({
    result: {},
    'success|1': true,
    error: '错误信息',
  });
}

module.exports = {
  '/api/loan/statistics/history': function () {
    return Mock.mock({
      error: '测试内容4k75',
      result: {
        loaning: {
          current: 38116,
          total: 12276,
        },
        potential: {
          current: 15430,
          total: 18514,
        },
        repayment: {
          current: 60601,
          total: 88361,
        },
        statisticTime: '测试内容sue5',
        waitConfirm: {
          current: 63847,
          total: 86057,
        },
        waitLoan: {
          current: 75116,
          total: 42124,
        },
      },
      success: true,
    });
  },
  '/api/loan/statistics/week': () => {
    return Mock.mock({
      error: '测试内容oupy',
      result: {
        activeUser: {
          'percent|1': ['-23', 34],
          'dataList|5': [
            {
              'quantity|+50': 100,
              'time|+1': 1,
            },
          ],
          current: /^\d{6,10}$/,
          total: /^\d{3,5}$/,
        },
        addUser: {
          'percent|1': ['-23', 34],
          'dataList|5': [
            {
              'quantity|+50': 100,
              'time|+1': 1,
            },
          ],
          current: /^\d{6,10}$/,
          total: /^\d{3,5}$/,
        },
        lendAmount: {
          'percent|1': ['-23', 34],
          'dataList|5': [
            {
              'quantity|+50': 100,
              'time|+1': 1,
            },
          ],
          current: /^\d{6,10}$/,
          total: /^\d{3,5}$/,
        },
        loanApply: {
          'percent|1': ['-23', 34],
          'dataList|5': [
            {
              'quantity|+50': 100,
              'time|+1': 1,
            },
          ],
          current: /^\d{6,10}$/,
          total: /^\d{3,5}$/,
        },
        loanApplyAmount: {
          'percent|1': ['-23', 34],
          'dataList|5': [
            {
              'quantity|+50': 100,
              'time|+1': 1,
            },
          ],
          current: /^\d{6,10}$/,
          total: /^\d{3,5}$/,
        },
        loanNum: {
          'percent|1': ['-23', 34],
          'dataList|5': [
            {
              'quantity|+50': 100,
              'time|+1': 1,
            },
          ],
          current: /^\d{6,10}$/,
          total: /^\d{3,5}$/,
        },
        paidAmount: {
          'percent|1': ['-23', 34],
          'dataList|5': [
            {
              'quantity|+50': 100,
              'time|+1': 1,
            },
          ],
          current: /^\d{6,10}$/,
          total: /^\d{3,5}$/,
        },
        planAmount: {
          'percent|1': ['-23', 34],
          'dataList|5': [
            {
              'quantity|+50': 100,
              'time|+1': 1,
            },
          ],
          current: /^\d{6,10}$/,
          total: /^\d{3,5}$/,
        },
      },
      success: true,
    });
  },
  '/api/loan/apply/list': () => {
    return Mock.mock({
      error: '测试内容884n',
      result: {
        'data|10-20': [
          {
            dealName: '测试内容q824',
            endTime: 54137,
            id: /^\d{3,5}$/,
            processName: '测试内容v5sb',
            projectStage: '测试内容6i93',
            acceptTime: 27546,
            source: '测试内容l3hl',
            startTime: 77714,
            'status|1': [1,2],
            supplierName: '测试内容00d6',
          },
        ],
        total: 35543,
      },
      success: true,
    });
  },
};
