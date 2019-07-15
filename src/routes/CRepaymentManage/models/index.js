import { reqApprovalOrg } from 'common/services/app';
import { responseErrorHandle } from 'commonUtils';
import * as Services from '../services';

export default {
  namespace: 'cRepaymentManage',
  state: {
    approvalOrg: [],
    repaymentPlan: {
      data: [],
      total: 0,
    },
    repaymentHistory: {
      data: [],
      total: 0,
    },
  },
  effects: {
    *fetchApprovalOrg({ payload }, { call, put }) {
      const response = yield call(reqApprovalOrg, payload);
      if (response.success) {
        yield put({
          type: 'approvalOrg',
          payload: response.result,
        });
      }
      responseErrorHandle(response);
    },
    *fetchRepaymentPlan({ payload }, { call, put }) {
      const response = yield call(Services.reqRepaymentPlan, payload);
      if (response.success) {
        yield put({
          type: 'repaymentPlan',
          payload: response.result,
        });
      }
      responseErrorHandle(response);
      return response;
    },
    *fetchRepaymentHistory({ payload }, { call, put }) {
      const response = yield call(Services.reqRepaymentHistory, payload);
      if (response.success) {
        yield put({
          type: 'repaymentHistory',
          payload: response.result,
        });
      }
      responseErrorHandle(response);
      return response;
    },
  },
  reducers: {
    approvalOrg(state, { payload }) {
      return {
        ...state,
        approvalOrg: payload,
      };
    },
    repaymentPlan(state, { payload }) {
      return {
        ...state,
        repaymentPlan: payload,
      };
    },
    repaymentHistory(state, { payload }) {
      return {
        ...state,
        repaymentHistory: payload,
      };
    },
  },
};

