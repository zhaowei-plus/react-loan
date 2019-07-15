// 处理状态
export const PROCESS_STATUS = [
  {
    type: null,
    name: '全部',
  }, {
    type: 0,
    name: '待处理',
  }, {
    type: 1,
    name: '已处理',
  },
];

// 状态对应状态点
export const BADGE_STATUS_CONFIG = {
  0: 'processing',
  1: 'success',
};

// 贷款记录
export const LOAN_STATUS = [
  {
    type: null,
    name: '全部',
  }, {
    type: 0,
    name: '无',
  }, {
    type: 1,
    name: '有',
  },
];

// 行为事件
export const ACTION_TYPE = [
  {
    type: null,
    name: '全部',
  }, {
    type: 1,
    name: '启动云智贷',
  }, {
    type: 2,
    name: '查看产品详情',
  }, {
    type: 3,
    name: '使用信贷计算器',
  }, {
    type: 4,
    name: '发起额度测算申请',
  }, {
    type: 6,
    name: '用户登录融资贷款应用',
  },
];
