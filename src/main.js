/** *
 * 'babel-polyfill' 修复IE9的问题
 * 'raf/polyfill' 修复IE9的动画问题
 * 'event-source-polyfill' dev下热加载问题
 */
import 'babel-polyfill';
import 'raf/polyfill';
import dva from 'dva';
import onError from 'src/common/error';
import createLoading from 'dva-loading';
import 'doraemon/lib/style/v2-compatible-reset';
import 'src/common/systemConfig';
import './common.less';

if (__DEV__) {
  require('event-source-polyfill');
}

const app = dva({
  onError,
});

/**
 * loading组件插件
 */
app.use(createLoading());

/**
 * 页面内部权限model
 */
app.model(require('src/common/models/privileges').default);

app.router(require('./router').default);

app.start('#root');
