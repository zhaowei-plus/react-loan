export const STATUS = [
  {
    type: 1,
    name: '待银行处理',
  }, {
    type: 2,
    name: '待平台处理',
  }, {
    type: 3,
    name: '已完结',
  },
];

export const TAB_LIST = [
  {
    label: '风险事件识别与管理列表',
    key: '1',
  },
];

export const ROUTES = [
  {
    label: '风险事件识别与管理',
  },
];


// 获得不同状态对应状态点类名
export const BADGE_STATUS = {
  1: 'processing',
  2: 'processing',
  3: 'success',
};

// 步骤条
export const STEP_LIST = [
  { key: 1, title: '待银行处理' },
  { key: 2, title: '待平台处理' },
  { key: 3, title: '已完结' },
];
