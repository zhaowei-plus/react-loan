/**
 * 接口代理转发
 * 针对多个域名，分别进行接口转发
 */

const domainTable = {
  dev: 'dev-debug.cai-inc.com',
  test: 'test.zcygov.cn',
  testPay: 'test-pay.cai-inc.com',
  test8: 'test8.cai-inc.com',
  staging: 'staging.zcygov.cn',
};

const domain = domainTable.test;

module.exports = {
  useMockStatusCode: [404, 403, 500, 502], // number[]
  rules: {
    // 用户
    uaa: {
      host: `http://login.${domain}`,
      urls: [],
    },
    // 网超
    mall: {
      host: `http://${domain}`,
      urls: [],
    },
    debug: {
      // host: 'http://10.201.75.30:8127',
      host: 'http://10.201.88.11:8127',
      urls: [
        '/api/loan/*',
      ],
    },
    // middle
    middle: {
      host: `http://middle.${domain}`,
      useMock: false, // boolean or string[] eg: true or ['/api/*']
      urls: [
        '/api/*',
        '/user/*',
        '/district/*',
        '/api/zoss/*',
        '/api/loan/*',
        '/api/member/*',
        '/api/article/*',
        '/help-center/*',
        '/zcy/user-web/*',
        '/api/apps/getAppsBasicInfo',
        '/api/district/getMyDistrict',
        '/api/users/getUserIdentity',
        '/api/apps/getAppsByDimForFront',
        '/api/privileges/getAppMenuTree',
        '/api/district/getDistrictTree',
        '/api/address/:pid/children',
        '/api/zcy/address/streets',
        '/api/privileges/getEnvHref',
        '/api/district/getSubDistrictByPid',
        '/backlog/item/obtainBacklogHeadInfo',
        '/neoericBacklog/api/obtainBacklogHeadInfo',
        '/api/loan/supplier/applyRecords',
      ],
    },
    // Rap Mock平台,无需token认证,修改本文件需要重启应用
    rap: {
      host: 'http://rap.cai-inc.com/mockjs/23', // 项目ID
      urls: [
        '/api/district/getDistrictTree',
        '/api/address/:pid/children',
      ],
    },
    // 专家库
    experts: {
      host: `http://experts.${domain}`,
      urls: ['/zcy/experts/*'],
    },
    // 代理机构
    agency: {
      host: `http://agency.${domain}`,
      urls: [],
    },
    // 供应商
    supplier: {
      host: `http://supplier.${domain}`,
      urls: [],
    },
    // 定点服务
    fixed: {
      host: `http://fixed.${domain}`,
      urls: [],
    },
    // 招投标
    bidding: {
      host: `http://bidding.${domain}`,
      urls: [],
    },
    // 车辆控购
    vehicle: {
      host: `http://vehicle.${domain}`,
      urls: [],
    },
    // 反向竞价
    reverse: {
      host: `http://reverse.${domain}`,
      urls: [],
    },
    // 在线询价，协议供货
    inquiry: {
      host: `http://inquiry.${domain}`,
      urls: [],
    },
    // 合同
    contract: {
      host: `http://contract.${domain}`,
      urls: [],
    },
  },
  user: {
    // account: 'admin', // 运营
    // account: 'gys0706', // 运营
    // account: 'supplier006', // 运营
    // account: 'juangys032002', // 运营
    // account: 'supplier006', // 运营1
    // account: 'nizi', // 供应商
    account: 'fenda30', // 供应商
    // password: 'test123456',
    // account: 'binjiangcgzx', // 滨江采购中心
    // account: 'chenxi04',
    password: 'test123456',
  },
};
