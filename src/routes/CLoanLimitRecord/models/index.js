import { reqApprovalOrg } from 'common/services/app';
import { responseErrorHandle } from 'commonUtils';
import * as Services from '../services';

export default {
  namespace: 'cLoanLimitRecord',
  state: {
    approvalOrg: [],
    limitRecord: {
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
    *fetchLimitRecord({ payload }, { call, put }) {
      const response = yield call(Services.reqLimitRecord, payload);
      if (response.success) {
        yield put({
          type: 'limitRecord',
          payload: response.result,
        });
      }
      responseErrorHandle(response);
    },
  },
  reducers: {
    approvalOrg(state, { payload }) {
      return {
        ...state,
        approvalOrg: payload,
      };
    },
    limitRecord(state, { payload }) {
      return {
        ...state,
        limitRecord: payload,
      };
    },

  },

};

