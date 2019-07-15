import { reqApprovalOrg } from 'common/services/app';
import { responseErrorHandle } from 'commonUtils';
import * as Services from '../services';

export default {
  namespace: 'cLoanApplyRecord',
  state: {
    approvalOrg: [],
    applyRecord: {
      data: [],
      total: 0,
    },
    tableSearchParams: {
      pageNo: 1,
      pageSize: 10,
      tab: '1',
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
    *fetchApplyRecord({ payload }, { call, put }) {
      const response = yield call(Services.reqApplyRecord, payload);
      if (response.success) {
        yield put({
          type: 'applyRecord',
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
    applyRecord(state, { payload }) {
      return {
        ...state,
        applyRecord: payload,
      };
    },
    tableSearchParams(state, { payload }) {
      return {
        ...state,
        tableSearchParams: payload,
      };
    },
  },


};

