import {
  responseErrorHandle,
} from 'commonUtils';
import * as Services from '../services';

export default {
  namespace: 'loanBusinessManage',
  state: {
    applyTableQueryParams: {
      pageNo: 1,
      pageSize: 10,
    },
    loanApplyList: {},
    borrowRecordList: {},
    channelList: [],
    approveRecordList: [],
    businessDetail: {},
    repayConditionList: [],
  },
  effects: {
    * getLoanApplyList({ payload }, { call, put }) {
      const res = yield call(Services.reqLoanApplyList, payload);
      if (res.success) {
        yield put({
          type: 'loanApplyList',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
    * getBorrowRecordList({ payload }, { call, put }) {
      const res = yield call(Services.reqBorrowRecordList, payload);
      if (res.success) {
        yield put({
          type: 'borrowRecordList',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
    * getChannelList({ payload }, { call, put }) {
      const res = yield call(Services.reqChannelList, payload);
      if (res.success) {
        yield put({
          type: 'channelList',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
    * inviteCustomer({ payload }, { call }) {
      const res = yield call(Services.reqInviteCustomer, payload);
      responseErrorHandle(res);
      return res;
    },
    * getApproveRecord({ payload }, { call, put }) {
      const res = yield call(Services.reqApproveRecord, payload);
      if (res.success) {
        yield put({
          type: 'approveRecordList',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },

    * getBusinessDetail({ payload }, { call, put }) {
      const res = yield call(Services.reqBusinessDetail, payload);
      if (res.success) {
        yield put({
          type: 'businessDetail',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },

    * getRepayConditionList({ payload }, { call, put }) {
      const res = yield call(Services.reqRepayConditionList, payload);
      if (res.success) {
        yield put({
          type: 'repayConditionList',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },

  },
  reducers: {
    applyTableQueryParams(state, action) {
      return {
        ...state,
        applyTableQueryParams: action.payload,
      };
    },
    loanApplyList(state, action) {
      return {
        ...state,
        loanApplyList: action.payload,
      };
    },
    borrowRecordList(state, action) {
      return {
        ...state,
        borrowRecordList: action.payload,
      };
    },
    channelList(state, action) {
      return {
        ...state,
        channelList: action.payload,
      };
    },
    approveRecordList(state, action) {
      return {
        ...state,
        approveRecordList: action.payload,
      };
    },
    businessDetail(state, action) {
      return {
        ...state,
        businessDetail: action.payload,
      };
    },
    repayConditionList(state, action) {
      return {
        ...state,
        repayConditionList: action.payload,
      };
    },
  },
};

