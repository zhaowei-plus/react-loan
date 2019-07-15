
// 操作项配置
export const getOperationConfig = id => (
  [{
    key: 'VIEW',
    label: '查看',
    to: `/risk-events/view/${id}`,
  }, {
    key: 'APPROVE',
    label: '审批',
    to: `/risk-events/approve/${id}`,
  }]
);
