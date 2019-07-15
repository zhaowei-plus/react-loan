import {
  responseErrorHandle,
} from 'commonUtils';

import {
  reqMarketingManageList,
  reqManualHandleRecordList,
  reqChangeResult,
} from '../services';

export default {
  namespace: 'marketingManage',
  state: {
    tableQueryParams: {
      pageNo: 1,
      pageSize: 10,
    },
    marketingManageList: {},
    manualHandleRecordList: {},
  },
  effects: {
    * getMarketingManageList({ payload }, { call, put }) {
      const res = yield call(reqMarketingManageList, payload);
      if (res.success) {
        yield put({
          type: 'marketingManageList',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
    * getManualHandleRecordList({ payload }, { call, put }) {
      const res = yield call(reqManualHandleRecordList, payload);
      if (res.success) {
        yield put({
          type: 'manualHandleRecordList',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
    * changeResult({ payload }, { call }) {
      const res = yield call(reqChangeResult, payload);
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
    marketingManageList(state, action) {
      return {
        ...state,
        marketingManageList: action.payload,
      };
    },
    manualHandleRecordList(state, action) {
      return {
        ...state,
        manualHandleRecordList: action.payload,
      };
    },
  },

};

