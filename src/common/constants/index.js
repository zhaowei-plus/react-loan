const baseFormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};


const halfFormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const FROM_ITEM_LAYOUT_8 = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};


const FROM_ITEM_LAYOUT_6 = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 18,
    },
  },
};


const PROJECT_PHASE = [
  {
    type: null,
    name: '全部',
  }, {
    type: 10,
    name: '额度测算中',
  }, {
    type: 20,
    name: '额度测算',
  }, {
    type: 30,
    name: '贷款申请平台审批',
  }, {
    type: 40,
    name: '贷款申请资方审批',
  }, {
    type: 41,
    name: '贷款申请未通过待处理',
  }, {
    type: 50,
    name: '贷款放款平台审批',
  }, {
    type: 60,
    name: '贷款放款资方审批',
  }, {
    type: 61,
    name: '贷款放款未通过待处理',
  }, {
    type: 70,
    name: '贷款申请成功',
  }, {
    type: 80,
    name: '贷款申请失败',
  },
];

const LIMIT_STATUS = [
  {
    type: null,
    name: '全部',
  },
  {
    type: 1,
    name: '已失效',
  },
  {
    type: 2,
    name: '生效中',
  },
  {
    type: 3,
    name: '待生效',
  },
];

const REPAY_STATUS = [
  {
    type: null,
    name: '全部',
  },
  {
    type: 1,
    name: '还款中',
  },
  {
    type: 2,
    name: '待还款',
  },
  {
    type: 3,
    name: '已还款',
  },
  {
    type: 4,
    name: '逾期中',
  },
  {
    type: 5,
    name: '逾期已还款',
  },
  {
    type: 6,
    name: '提前还款',
  },
  {
    type: 7,
    name: '已终止',
  },

];


// 还款计划-还款状态
const REPAY_PLAN_STATUS = [
  {
    type: null,
    name: '全部',
  },
  {
    type: 1,
    name: '还款中',
  },
  {
    type: 2,
    name: '待还款',
  },
  {
    type: 4,
    name: '逾期中',
  },
];

// 还款历史-还款状态
const REPAY_HISTORY_STATUS = [
  {
    type: null,
    name: '全部',
  },
  {
    type: 3,
    name: '已还款',
  },
  {
    type: 5,
    name: '逾期已还款',
  },
  {
    type: 6,
    name: '提前还款',
  },
  {
    type: 7,
    name: '已终止',
  },

];

const DEAL_TYPE = [
  {
    type: null,
    name: '全部',
  },
  {
    type: 1,
    name: '借款本金放款',
  },
  {
    type: 2,
    name: '借款本息还款',
  },
  {
    type: 3,
    name: '服务费缴纳',
  },
];

// const RATE_TYPE = [
//   {
//     type: null,
//     name: '全部',
//   },
//   {
//     type: 1,
//     name: '固定利率',
//   },
//   {
//     type: 2,
//     name: '分段利率',
//   }, {
//     type: 3,
//     name: '浮动利率',
//   },
//   {
//     type: 4,
//     name: '分期特定利率',
//   }, {
//     type: 5,
//     name: '混合利率',
//   },
// ];

const APPLY_STATUS = [
  {
    type: null,
    name: '全部',
  },
  {
    type: 0,
    name: '不可申请',
  },
  {
    type: 1,
    name: '可申请',
  },
  {
    type: 2,
    name: '已申请',
  },
  {
    type: 3,
    name: '已邀请',
  },

];

const BORROW_STATUS = [
  {
    type: null,
    name: '全部',
  },
  {
    type: 1,
    name: '还款中',
  },
  {
    type: 2,
    name: '逾期中',
  },
  {
    type: 3,
    name: '已结清',
  },
  {
    type: 4,
    name: '逾期已结清',
  },
  {
    type: 5,
    name: '提前结清',
  },
];

const REPAY_METHOD = [
  {
    type: 1,
    name: '一次性还本付息',
  },
  {
    type: 2,
    name: '按月付息到期还本',
  },
  {
    type: 3,
    name: '按季度付息到期还本',
  },
];


const QUOTA_TYPE = [
  {
    type: 1,
    name: '循环额度',
  }, {
    type: 2,
    name: '单笔单次',
  },
];


const PROJECT_SOURCE = [
  {
    type: 1,
    name: '政采云云智贷',
  },
  {
    type: 2,
    name: '政采云精品推荐',
  },
];


/**
 * 借款状态对应状态点配置
 * 1: 还款中
 * 2: 逾期中
 * 3: 已还款
 * 4: 逾期已还款
 * 5: 提前还款
 */
const BORROW_BADGE_STATUS_CONFIG = {
  1: 'processing',
  2: 'error',
  3: 'success',
  4: 'success',
  5: 'success',
};

/**
 * 额度状态对应状态点配置
 * 1: 已失效
 * 2: 生效中
 * 3: 待生效
 */
const LIMIT_BADGE_STATUS_CONFIG = {
  1: 'default',
  2: 'success',
  3: 'processing',
};

/**
 * 还款状态对应状态点配置
 * 1: 还款中
 * 2: 待还款
 * 3: 已还款
 * 5: 逾期已还款
 * 6: 提前还款
 * 7: 已终止
 */
const REPAY_BADGE_STATUS_CONFIG = {
  1: 'processing',
  2: 'processing',
  3: 'success',
  4: 'error',
  5: 'success',
  6: 'success',
  7: 'default',
};


module.exports = {
  FROM_ITEM_LAYOUT_8,
  FROM_ITEM_LAYOUT_6,
  PROJECT_PHASE, // 项目阶段
  LIMIT_STATUS, // 额度状态
  BORROW_STATUS, // 借款状态
  REPAY_STATUS, // 还款状态
  DEAL_TYPE, // 交易类型
  // RATE_TYPE, // 利率类型
  APPLY_STATUS, // 申请状态
  REPAY_METHOD, // 还款方式
  QUOTA_TYPE, // 额度类型
  PROJECT_SOURCE, // 项目申请来源
  halfFormItemLayout,
  baseFormItemLayout,
  REPAY_PLAN_STATUS, // 还款计划-还款状态
  REPAY_HISTORY_STATUS, // 还款历史-还款状态
  BORROW_BADGE_STATUS_CONFIG, // 借款状态对应状态点配置
  LIMIT_BADGE_STATUS_CONFIG, // 额度状态对应状态点配置
  REPAY_BADGE_STATUS_CONFIG, // 还款状态对应状态点配置

};

