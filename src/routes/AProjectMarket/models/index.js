import {
  responseErrorHandle,
} from 'commonUtils';

import {
  reqProjectMarketList,
} from '../services';

export default {
  namespace: 'projectMarket',
  state: {
    tableQueryParams: {
      pageNo: 1,
      pageSize: 10,
      tab: '1',
    },
    projectMarketList: {},
  },
  effects: {
    * fetchProjectMarketList({ payload }, { call, put }) {
      const res = yield call(reqProjectMarketList, payload);
      if (res.success) {
        yield put({
          type: 'projectMarketList',
          payload: res.result,
        });
      }
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
    projectMarketList(state, action) {
      return {
        ...state,
        projectMarketList: action.payload,
      };
    },
  },

};

