/**
 * 分期付款状态文本、样式、图标以及配置配置
 * */
export const stageStatus = [
  undefined,
  {
    // 还款中
    src: require('assets/icon-repay-waiting.png'), // 图片路径
    text: '还款中', // 状态文案
    bgIconStyle: 'waiting', // 背景图标样式
    style: 'repay-waiting', // item 样式
  }, {
    // 待还款
    src: require('assets/icon-repay-waiting.png'),
    text: '待还款',
    bgIconStyle: 'waiting',
    style: 'repay-waiting',
  }, {
    // 已还款
    src: require('assets/icon-repay-success.png'),
    text: '已还款',
    bgIconStyle: 'success',
    style: 'repay-success',
  }, {
    // 逾期中
    src: require('assets/icon-repay-overdue.png'),
    text: '逾期中',
    bgIconStyle: 'overdue',
    style: 'repay-overdue',
  }, {
    // 逾期已还款
    src: require('assets/icon-repay-success.png'),
    text: '已还款',
    bgIconStyle: 'success',
    style: 'repay-success',
  }, {
    // 提前还款
    src: require('assets/icon-repay-success.png'),
    text: '提前还款',
    bgIconStyle: 'success',
    style: 'repay-success',
  }, {
    // 已终止
    src: require('assets/icon-repay-cancelled.png'),
    text: '已终止',
    bgIconStyle: 'cancelled',
    style: 'repay-cancelled',
  },
];

// 借款状态  1-还款中、2-逾期中、3-已结清、4-逾期已结清、5-提前结清
export const loanStatus = [
  { value: null, text: '全部' },
  { value: 1, text: '还款中', textClass: 'blue' },
  { value: 2, text: '逾期中', textClass: 'red' },
  { value: 3, text: '已结清', textClass: 'green' },
  { value: 4, text: '逾期已结清', textClass: 'green' },
  { value: 5, text: '提前结清', textClass: 'green' },
];

// 按季度付息到期还本
export const repaymentTypes = [
  '',
  '一次性还本付息', // 1 一次性还本付息
  '按月付息到期还本', // 2 按月付息到期还本
  '按季度付息到期还本', // 3 按季度付息到期还本
];
