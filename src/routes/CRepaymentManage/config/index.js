// 还款状态
export const repayStatus = [
  { value: null, text: '全部' },
  { value: 1, text: '还款中', status: 'processing' },
  { value: 2, text: '待还款', status: 'processing' },
  { value: 3, text: '已还款', status: 'success' },
  { value: 4, text: '逾期中', status: 'error' },
  { value: 5, text: '逾期已还款', status: 'success' },
  { value: 6, text: '提前还款', status: 'success' },
  { value: 7, text: '已终止', status: 'default' },
];

// 还款计划状态
export const repayPlanStatus = [
  { value: null, text: '全部' },
  { value: 1, text: '还款中' },
  { value: 2, text: '待还款' },
  { value: 4, text: '逾期中' },
];

// 还款历史状态
export const repayHistoryStatus = [
  { value: null, text: '全部' },
  { value: 3, text: '已还款' },
  { value: 5, text: '逾期已还款' },
  { value: 6, text: '提前还款' },
  { value: 7, text: '已终止' },
];
