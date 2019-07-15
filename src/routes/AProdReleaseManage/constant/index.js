export const BIZ_TYPE = [{
  label: '贷款业务',
  value: 1,
}];

export const PROD_CATEGORY = [{
  label: '企业信用',
  value: 1,
}];

export const PROD_RELEASE_STATUS = [{
  label: '已发布',
  value: 1,
}, {
  label: '已下架',
  value: 2,
}, {
  label: '暂存',
  value: 3,
}];
export const PROD_TYPE = [{
  label: '流水贷',
  value: 1,
}];
export const REPAYMENT_TYPE = [{
  value: 1,
  label: '等额本息',
}, {
  value: 2,
  label: '等额本金',
}, {
  value: 3,
  label: '每月付息到期还本',
}, {
  value: 4,
  label: '到期还本付息',
}, {
  value: 5,
  label: '等本等息',
}];


export const REPAYMENT_CYCLE = [{
  value: 1,
  label: '日',
}, {
  value: 2,
  label: '月',
}, {
  value: 3,
  label: '季',
}, {
  value: 4,
  label: '半年',
}, {
  value: 5,
  label: '年',
}, {
  value: 6,
  label: '自定义',
  withInput: true,
}];


export const OVERDUE_RATE = [{
  value: 1,
  label: '按未还款合同金额收取',
}, {
  value: 2,
  label: '贷款利率基础上浮',
  withInput: true,
  suffix: '%',
}, {
  value: 3,
  label: '固定利率',
  withInput: true,
  suffix: '%',
}];


export const BREACH_RULE = [{
  value: 1,
  label: '不收取',
}, {
  value: 2,
  label: '未还款合同金额收取',
  withInput: true,
  suffix: '%',
}];

export const CHARGE_MODEL = [{
  name: '头尾',
  field: 'modelHead',
  options: [{
    value: 1,
    label: '包头包尾',
  }, {
    value: 2,
    label: '包头不包尾',
  }],
}, {
  name: '年模型',
  field: 'modelYear',
  options: [{
    value: 1,
    label: '360',
  }, {
    value: 2,
    label: '365',
  }, {
    value: 3,
    label: '366',
  }],
}];


export const SHOW_MODULE = [{
  value: 1,
  label: '云智贷',
  widthInput: true,
}, {
  value: 2,
  label: '精品推荐',
  widthInput: true,
}, {
  value: 3,
  label: '热门申请',
  widthInput: true,
}];

export const SHOW_CASE_DISTRICT = [{
  value: true,
  label: '全部区划',
}, {
  value: false,
  label: '指定区划',
  withSelect: true,
}];


export const SHOW_CASE_COMPANY = [{
  value: 1,
  label: '区划内客户',
}, {
  value: 2,
  label: '制定客户',
  withSelect: true,
}];

export const PROCESS_NAME = [{
  value: 1,
  label: '小微网贷流程',
}];

export const BIZ_NODES = [{
  value: 1,
  label: '发起贷款申请',
}];


export const CHARGE_TYPES = [{
  value: 1,
  label: '技术服务费',
}];

export const CHARGE_NODES = [{
  value: 1,
  label: '借款申请成功后',
}];
export const PROD_FIELD = [
  'resetProdDetail.code',
  'resetProdDetail.num',
  'resetProdDetail.subtitle',
  'resetProdDetail.smallImage',
  'resetProdDetail.bigImage',
  'resetProdDetail.note',
  'resetProdDetail.problem',
];


export const FULL_LOCATION = [{
  name: '产品简介',
  value: '1',
  target: 'product-info',
}, {
  name: '基础数据',
  value: '1',
  target: 'base-statistics',
}, {
  name: '基础信息',
  value: '1',
  target: 'base-info',
}, {
  name: '橱窗位',
  value: '1',
  target: 'show-case',
}, {
  name: '利率方案',
  value: '1',
  target: 'rate-scheme',
}, {
  name: '费用收取清单',
  value: '1',
  target: 'charge-table',
}, {
  name: '贷款必备条件',
  value: '1',
  target: 'loan-condition',
}, {
  name: '贷款产品合同',
  value: '1',
  target: 'contract-table',
}];

