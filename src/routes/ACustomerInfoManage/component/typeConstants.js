// 银行摘要
export const BANK_REMARK = [
  {
    type: 1,
    name: '批量扣款',
  }, {
    type: 2,
    name: '自主还款',
  },
];

// 产品类型
export const PRODUCT_TYPE = [
  {
    type: 1,
    name: '小微网贷',
  },
];

// 产品类别
export const PRODUCT_CATEGORY = [
  {
    type: 1,
    name: '企业信用',
  },
];

// 申请状态
export const APPLY_STATUS = [
  {
    type: null,
    name: '全部',
  }, {
    type: 1,
    name: '申请审批中',
  }, {
    type: 2,
    name: '申请成功',
  }, {
    type: 3,
    name: '申请失败',
  },
];

/**
 * 申请状态对应状态点配置
 * 1: 申请审批中
 * 2: 申请成功
 * 3: 申请失败
 */
export const APPLY_BADGE_STATUS_CONFIG = {
  1: 'processing',
  2: 'success',
  3: 'error',
};
