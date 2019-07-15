export const RECORD_STATUS = [
  {
    type: null,
    name: '全部',
  },
  {
    type: 1,
    name: '已备案',
  }, {
    type: 2,
    name: '备案撤回申请中',
  },
];

/**
 * 状态点配置
 * 1: 已备案
 * 2: 备案撤回申请中
 */
export const BADGE_STATUS_CONFIG = {
  1: 'success',
  2: 'processing',
};

