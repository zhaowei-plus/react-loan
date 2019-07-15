import {
  responseErrorHandle,
} from 'commonUtils';
import * as Services from '../services';

export default {
  namespace: 'fundsChannel',
  state: {
    tableQueryParams: {
      pageNo: 1,
      pageSize: 10,
    },
    fundsChannelList: {},
  },
  effects: {
    * getFundsChannelList({ payload }, { call, put }) {
      const res = yield call(Services.reqFundsChannelList, payload);
      if (res.success) {
        yield put({
          type: 'fundsChannelList',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
    * handleChannel({ payload }, { call }) {
      const res = yield call(Services.reqHandleChannel, payload);
      responseErrorHandle(res);
      return res;
    },
  },
  reducers: {
    tableQueryParams(state, action) {
      return {
        ...state,
        tableQueryParams: action.payload,
      };
    },
    fundsChannelList(state, action) {
      return {
        ...state,
        fundsChannelList: action.payload,
      };
    },
  },

};

