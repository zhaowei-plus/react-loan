import {
  responseErrorHandle,
} from 'commonUtils';

import * as Services from '../services';

export default {
  namespace: 'loanProcess',
  state: {
    tableQueryParams: {
      pageNo: 1,
      pageSize: 10,
    },
    synthesisList: {},
    workbenchList: {},
    synthesisDetail: {},
    workbenchDetail: {},
  },
  effects: {
    * getSynthesisList({ payload }, { call, put }) {
      const res = yield call(Services.reqSynthesisList, payload);
      if (res.success) {
        yield put({
          type: 'synthesisList',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
    * getWorkbenchList({ payload }, { call, put }) {
      const res = yield call(Services.reqWorkbenchList, payload);
      if (res.success) {
        yield put({
          type: 'workbenchList',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
    * getSynthesisDetail({ payload }, { call, put }) {
      const res = yield call(Services.reqSynthesisDetail, payload);
      if (res.success) {
        yield put({
          type: 'synthesisDetail',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
    * getWorkbenchDetail({ payload }, { call, put }) {
      const res = yield call(Services.reqWorkbenchDetail, payload);
      if (res.success) {
        yield put({
          type: 'workbenchDetail',
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
    synthesisList(state, action) {
      return {
        ...state,
        synthesisList: action.payload,
      };
    },
    workbenchList(state, action) {
      return {
        ...state,
        workbenchList: action.payload,
      };
    },
    synthesisDetail(state, action) {
      return {
        ...state,
        synthesisDetail: action.payload,
      };
    },
    workbenchDetail(state, action) {
      return {
        ...state,
        workbenchDetail: action.payload,
      };
    },
    resetList(state) {
      return {
        ...state,
        workbenchList: {},
        synthesisList: {},
      };
    },
  },

};

