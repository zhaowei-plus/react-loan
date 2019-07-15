const Mock = require('mockjs');

function randomSuccess(res) {
  return Mock.mock({
    success: true,
    result: res || {},
    message: '错误',
  });
}

module.exports = {
  '/api/loan/riskMgmt/riskRecords': () => {
    return Mock.mock({
      message: '获取列表失败',
      result: {
        'data|15': [
          {
            'id|+1': 1,
            code: '1111111111',
            'typeDesc|1': ['还款逾期', '合同更新', '项目更新'],
            briefDesc: '浙江大河有限公司发生一笔合同更新',
            riskDetail: '浙江大河有限公司有一笔合同金额减少20%以内，减少前为“300.00元”，减少后为“200.00元”，项目名称为897783，标项名称897783，合同编号为999999',
            // riskDetail: '012345678901234567890123456789012345678901234567890123456789',
            advice: '根据银行处理结果进行审核处理',
            riskTarget: '这是风险对象',
            reportInstitution: '中国农业银行杭州西湖支行',
            reportTime: 1546272000000,
            executor: '@cname',
            finishTime: 1546272000000,
            'status|1': [1, 2, 3],
            consumeTime: '1天2小时0分',
          },
        ],
      },
      success: true,
    });
  },
  '/api/risk-events/remind': () => {
    return randomSuccess();
  },
  '/api/risk-events/delete': () => {
    return randomSuccess();
  },
  '/api/loan/riskMgmt/riskRecord/approval': () => {
    return randomSuccess();
  },
  '/api/loan/riskMgmt/riskRecord/detail': () => {
    return Mock.mock({
      message: '错误',
      success: true,
      result: {
        'flowLogs|2-5': [
          {
            'id|+1': 1,
            createAt: '2019/1/1 12:12:12',
            orgName: 'XXX机构',
            userName: 'XXX同学',
            'userAction|+1': [
              '发起操作',
              '操作执行',
              '上级审批',
              '审批完毕',
            ],
            remark: '流转日志详情',
          },
        ],
        company: 'XXX有限公司名称',
        riskNo: '111111111111111111111',
        'status|1': [1, 2, 3],
        time: 1554722393000,
        riskRecord: {
          code: '1111111111',
          'typeDesc|1': ['还款逾期', '合同更新', '项目更新'],
          briefDesc: '浙江大河有限公司发生一笔合同更新',
          riskDetail: '浙江大河有限公司有一笔合同金额减少20%以内，减少前为“300.00元”，减少后为“200.00元”，项目名称为897783，标项名称897783，合同编号为999999',
          advice: '根据银行处理结果进行审核处理',
          riskTarget: '这是风险对象',
          reportInstitution: '中国农业银行杭州西湖支行',
          reportTime: 1546272000000,
          executor: '@cname',
          endTime: 1546272000000,
          'status|1': [2],
          consumeTime: '1天2小时0分',
        },
        supplierInfo: {
          name: '这是供应商名称',
          address: '这是地址这是地址这是地址这是地址这是地址这是地址这是地址这是地址这是地址',
          email: '123456@123.com',
          phoneNum: '1111111111',
        },
      },
    });
  },
  '/api/risk-events/timeLine': () => {
    return Mock.mock({
      message: '流转日志获取错误',
      result: {
        'data|2-5': [
          {
            'id|+1': 1,
            'createAt|+3': 1545219035339,
            orgName: 'XXX同学',
            userName: '10007366144',
            'action|+1': [
              '发起操作',
              '操作执行',
              '上级审批',
              '审批完毕',
            ],
            remark: '流转日志详情',
          },
        ],
        total: 5,
      },
      success: true,
    });
  },
};
