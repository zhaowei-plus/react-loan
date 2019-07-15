import {
  responseErrorHandle,
} from 'commonUtils';

import {
  reqCustomerInfoList,
  reqCustomerInfoDetail,
  reqApplyRecord,
  reqLimitRecord,
  reqBorrowRecord,
  reqRepayPlan,
  reqRepayHistory,
  reqCapitalRecord,
  reqOrgList,
} from '../services';

export default {
  namespace: 'customerInfo',
  state: {
    tableQueryParams: {
      pageNo: 1,
      pageSize: 10,
      type: '1',
    },
    customerInfoList: {},
    customerInfoDetail: {},
    applyRecord: {},
    limitRecord: {},
    borrowRecord: {},
    repayPlan: {},
    repayHistory: {},
    capitalRecord: {},
    orgList: [],
  },
  effects: {
    * getCustomerInfoList({ payload }, { call, put }) {
      const res = yield call(reqCustomerInfoList, payload);
      if (res.success) {
        yield put({
          type: 'customerInfoList',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
    * getCustomerInfoDetail({ payload }, { call, put }) {
      const res = yield call(reqCustomerInfoDetail, payload);
      if (res.success) {
        yield put({
          type: 'customerInfoDetail',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
    * getApplyRecord({ payload }, { call, put }) {
      const res = yield call(reqApplyRecord, payload);
      if (res.success) {
        yield put({
          type: 'applyRecord',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
    * getLimitRecord({ payload }, { call, put }) {
      const res = yield call(reqLimitRecord, payload);
      if (res.success) {
        yield put({
          type: 'limitRecord',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
    * getBorrowRecord({ payload }, { call, put }) {
      const res = yield call(reqBorrowRecord, payload);
      if (res.success) {
        yield put({
          type: 'borrowRecord',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
    * getRepayPlan({ payload }, { call, put }) {
      const res = yield call(reqRepayPlan, payload);
      if (res.success) {
        yield put({
          type: 'repayPlan',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
    * getRepayHistory({ payload }, { call, put }) {
      const res = yield call(reqRepayHistory, payload);
      if (res.success) {
        yield put({
          type: 'repayHistory',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
    * getCapitalRecord({ payload }, { call, put }) {
      const res = yield call(reqCapitalRecord, payload);
      if (res.success) {
        yield put({
          type: 'capitalRecord',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
    * getOrgList({ payload }, { call, put }) {
      const res = yield call(reqOrgList, payload);
      if (res.success) {
        yield put({
          type: 'orgList',
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
    customerInfoList(state, action) {
      return {
        ...state,
        customerInfoList: action.payload,
      };
    },
    customerInfoDetail(state, action) {
      return {
        ...state,
        customerInfoDetail: action.payload,
      };
    },
    applyRecord(state, action) {
      return {
        ...state,
        applyRecord: action.payload,
      };
    },
    limitRecord(state, action) {
      return {
        ...state,
        limitRecord: action.payload,
      };
    },
    borrowRecord(state, action) {
      return {
        ...state,
        borrowRecord: action.payload,
      };
    },
    repayPlan(state, action) {
      return {
        ...state,
        repayPlan: action.payload,
      };
    },
    repayHistory(state, action) {
      return {
        ...state,
        repayHistory: action.payload,
      };
    },
    capitalRecord(state, action) {
      return {
        ...state,
        capitalRecord: action.payload,
      };
    },
    orgList(state, action) {
      return {
        ...state,
        orgList: action.payload,
      };
    },
    resetDetail(state) {
      return {
        ...state,
        customerInfoDetail: {},
        applyRecord: {},
        limitRecord: {},
        borrowRecord: {},
        repayPlan: {},
        repayHistory: {},
        capitalRecord: {},
        orgList: [],
      };
    },
  },

};

