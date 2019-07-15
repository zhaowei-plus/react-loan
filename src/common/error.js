/**
 * 异步请求错误处理
 */
import { routerRedux } from 'dva/router';
import { Modal } from 'doraemon';
import responseErrHandleBlockHack from './hack';

const error = (e, dispatch) => {
  if (responseErrHandleBlockHack(e)) {
    return;
  }
  if (e.status === 400) {
    Modal.warning({
      title: '抱歉，系统开小差了~',
      content: e.data.message,
    });
  }
  if (e.status === 403) {
    dispatch(routerRedux.push('/exception/403'));
  }
  if (e.status >= 404 && e.status < 422) {
    dispatch(routerRedux.push('/exception/404'));
  }
  if (e.status <= 504 && e.status >= 500) {
    Modal.error({
      title: '服务器内部错误，无法完成请求',
    });
  }
};

export default error;
