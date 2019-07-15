// 项目状态
export const PROJECT_STATUS = [
  {
    type: null,
    name: '全部',
  },
  {
    type: 1,
    name: '待生成合同',
  }, {
    type: 2,
    name: '已生成部分合同',
  }, {
    type: 3,
    name: '全部生成合同',
  }, {
    type: 4,
    name: '已发废标公告',
  }, {
    type: 5,
    name: '项目终止',
  },
];

export const APPLY_STATUS = [
  {
    type: null,
    name: '全部',
  },
  {
    type: 1,
    name: '可申请',
  },
  {
    type: 2,
    name: '不可申请',
  },
  {
    type: 3,
    name: '申请审批中',
  },
  {
    type: 4,
    name: '申请通过',
  },
];

// 状态点配置
export const BADGE_STATUS_CONFIG = {
  1: 'processing',
  2: 'error',
  3: 'processing',
  4: 'success',
};
