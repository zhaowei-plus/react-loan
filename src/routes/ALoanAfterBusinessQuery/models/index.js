import {
  responseErrorHandle,
} from 'commonUtils';

import * as Services from '../services';

export default {
  namespace: 'loanAfterBusinessQuery',
  state: {
    repayPlanList: {},
    repayHistoryList: {},
    capitalRecordList: {},
    limitRecordList: {},

    channelNameList: [],
  },
  effects: {
    * getRepayPlanList({ payload }, { call, put }) {
      const res = yield call(Services.reqRepayPlanList, payload);
      if (res.success) {
        yield put({
          type: 'repayPlanList',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
    * getRepayHistoryList({ payload }, { call, put }) {
      const res = yield call(Services.reqRepayHistoryList, payload);
      if (res.success) {
        yield put({
          type: 'repayHistoryList',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
    * getChannelNameList({ payload }, { call, put }) {
      const res = yield call(Services.reqChannelNameList, payload);
      if (res.success) {
        yield put({
          type: 'channelNameList',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
    * getCapitalRecordList({ payload }, { call, put }) {
      const res = yield call(Services.reqCapitalRecordList, payload);
      if (res.success) {
        yield put({
          type: 'capitalRecordList',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },

    * getLimitRecordList({ payload }, { call, put }) {
      const res = yield call(Services.reqLimitRecordList, payload);
      if (res.success) {
        yield put({
          type: 'limitRecordList',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
  },
  reducers: {
    repayPlanList(state, action) {
      return {
        ...state,
        repayPlanList: action.payload,
      };
    },
    repayHistoryList(state, action) {
      return {
        ...state,
        repayHistoryList: action.payload,
      };
    },
    channelNameList(state, action) {
      return {
        ...state,
        channelNameList: action.payload,
      };
    },
    orgList(state, action) {
      return {
        ...state,
        orgList: action.payload,
      };
    },
    capitalRecordList(state, action) {
      return {
        ...state,
        capitalRecordList: action.payload,
      };
    },
    limitRecordList(state, action) {
      return {
        ...state,
        limitRecordList: action.payload,
      };
    },
  },

};

