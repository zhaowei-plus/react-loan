# zcy-loan-front

> 融资贷款前端项目

## 目录结构

```
.
├── build                                 # webpack和本地server服务配置文件目录
│   ├── build.js                          # webpack生产prod入口文件
│   ├── check-versions.js                 # 打包编译环境版本检查
│   ├── dev-client.js                     # server reload配置
│   ├── dev-proxy.js                      # server代理服务设置
│   ├── dev-server.js                     # server服务
│   ├── merge-router-plugin.js            # webpack自动合并路由插件
│   ├── utils.js                          # webpack配置所需的工具函数
│   ├── webpack.base.conf.js              # webpack基础配置文件
│   ├── webpack.dev.conf.js               # webpack开发环境配置文件
│   └── webpack.prod.conf.js              # webpack生产环境配置文件
├── config                                # 提供给webpack各个环境的配置变量文件目录
│   ├── dev.env.js                        # dev开发环境的环境变量
│   ├── index.js                          # webpack各环境的配置变量
│   ├── prod.env.js                       # prod生产环境的环境变量
│   ├── proxy.js                          # server代理的配置文件
│   └── test.env.js                       # test生产环境的环境变量
├── mockData                              # mock数据文件目录
│   └── index.js                          # mock数据
├── src                                   # 项目源码
│   ├── assets                            # 静态资源文件
│   ├── common                            # 公共文件目录
│   │   ├── checkPermitUrl.js             # 需要鉴权的页面配置
│   │   ├── error.js                      # 接口错误处理
│   │   ├── models                        # 公共model
│   │   │   └── privileges.js             # 权限model
│   │   ├── router.js                     # 路由转换逻辑
│   │   └── services                      # 公共services
│   │       └── app.js                    # 应用service api
│   ├── components                        # 组件
│   │   └── Authorized                    # 权限校验组件
│   │       ├── Authorized.js                     
│   │       ├── AuthorizedRoute.js                      
│   │       ├── CheckPermissions.js                     
│   │       ├── PromiseRender.js                      
│   │       └── index.js                      
│   ├── index.hbs                         # html入口文件
│   ├── layouts                           # layout目录
│   │   └── ZcyLayout.js                  # 基础layout
│   ├── main.js                           # js入口文件
│   ├── router-config.js                  # 路由配置,每次打包由webpack自动生成
│   ├── router.js                         # 路由入口
│   ├── routes                            # 页面模块                  
│   │   └── Exception                     # 异常模块
│   │       ├── index.js                  # 异常模块路由配置
│   │       └── views                     # 异常模块视图
│   │           ├── 403.js                # 403异常视图
│   │           └── 404.js                # 404异常视图
│   └── utils                             # 工具类函数文件目录
│       ├── request.js                    # request文件
│       └── utils.js                      # 工具类函数文件
├── test                                  # 单元测试文件目录
├── postcss.config.js                    
├── package.json                      
└── README.md      
```
##目录结构说明
- 目录结构命名规则为角色名+业务名称
    - A admin 平台运营管理角色
        - ACommonLoanView 部分共用详情页
        - AContractManage  合同管理
        - ACustomerInfoManage 企业客户档案管理
        - AFundsChannel 资方渠道
        - AFundsFlow 资金流水
        - ALoanApplyManage 贷款申请管理
        - ALoanLimitManage 贷款额度管理
        - ALoanOverview 总览
        - ALoanPaperConfig 贷款材料管理
        - ALoanQualificationConfig 贷款条件管理
        - ALoanProcessManage 贷款流程管理
        - ALoanRecordManage 贷款记录管理
        - AMarketingManage 营销中心
        - AProdManage  产品设计
        - AProdReleaseManage 产品发布记录
        - ARepaymentPlanManage 还款计划管理
        - ARepaymentRecordManage 还款记录管理
        - AServiceChargeManage 服务费台账

    -  C customer 客户角色（目前只包含供应商）
        - CFundsFlow  资金流水
        - CLoanApply 贷款申请
        - CLoanApplyRecord 贷款申请记录
        - CLoanLimitEvaluation 贷款额度评估
        - CLoanLimitRecord 贷款额度记录
        - CLoanOverview 贷款总览
        - CLoanRecord 贷款记录
        - CRepaymentManage 还款管理
        
       
    

## 项目npm命令

- `npm run dev` 项目开发启动命令
- `npm run testbuild` 项目测试环境编译命令
- `npm run build` 项目生产环境编译命令
- `npm run lint-fix` eslint fix

## 涉及技术栈

- [x] [React](https://reactjs.org/)
- [x] [React-router](https://reacttraining.com/react-router/)
- [x] [Redux](https://github.com/reactjs/redux)
- [x] [Redux-saga](https://redux-saga.js.org/)
- [x] [Dva](https://github.com/dvajs/dva)
- [x] [antd](https://ant.design/index-cn)
- [x] [Webpack](https://webpack.github.io)
- [x] [Babel](https://babeljs.io/)
- [x] [Autoprefixer](https://github.com/postcss/autoprefixer)
- [x] [PostCSS](https://github.com/postcss/postcss)
- [x] [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
- [ ] 还有哪些你认为有价值的优化点？随时联系@大海@蜗牛
