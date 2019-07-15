/* eslint-disable */
/**
 * module.exports 可为 array(多路由使用) or object，建议统一使用array
 * | name        | type     | requierd | defalut                          | example          | description 
 * | ----------- | -------- | -------- | -------------------------------- | ---------------- | --------------
 * | url         | string   | true     |                                  | '/exception/403' | 页面路由
 * | view        | string   | true     | index                            | '403'            | 页面路由所对应的视图，配置文件名将自动查找当前目录下views文件夹内的文件 
 * | models      | string[] | false    | 当前模块下的models文件夹中 文件名数组 | ['403']          | 页面路由依赖的models 
 * | childRoutes | object[] | false    |                                  | [{}, {}]         | childRoutes配置同路由配置 
 * | extraModels | string[] | false    |                                  | ['common/models/user', 'routes/Other/models/other'] | src路径下并不在同一模块下的models配置
 * | exact       | boolean  | false    | false                            |                  | react-router原配置，路由严格匹配
 */
/* esint-enable */
module.exports = [{
  url: '/exception/403',
  view: '403'
}, {
  url: '/exception/404',
  view: '404',
}];
