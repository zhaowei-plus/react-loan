import {
  responseErrorHandle,
} from 'commonUtils';

import {
  reqList,
  reqRemind,
  reqDelete,
  reqDetail,
  reqApprove,
} from '../services';

export default {
  namespace: 'riskEvents',
  state: {
    tableQueryParams: {
      pageNo: 1,
      pageSize: 10,
    },
    list: {},
    detail: {},
  },
  effects: {
    * fetchList({ payload }, { call, put }) {
      const res = yield call(reqList, payload);
      if (res.success) {
        yield put({
          type: 'list',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
    * remind({ payload }, { call }) {
      const res = yield call(reqRemind, payload);
      responseErrorHandle(res);
      return res;
    },
    * delete({ payload }, { call }) {
      const res = yield call(reqDelete, payload);
      responseErrorHandle(res);
      return res;
    },
    * fetchDetail({ payload }, { call, put }) {
      const res = yield call(reqDetail, payload);
      if (res.success) {
        yield put({
          type: 'detail',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
    * approve({ payload }, { call }) {
      const res = yield call(reqApprove, payload);
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
    list(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    detail(state, action) {
      return {
        ...state,
        detail: action.payload,
      };
    },
    resetList(state) {
      return {
        ...state,
        list: {},
      };
    },
    resetDetail(state) {
      return {
        ...state,
        detail: {},
      };
    },
  },
};

