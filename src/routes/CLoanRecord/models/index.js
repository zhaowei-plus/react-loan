import { reqApprovalOrg } from 'common/services/app';
import { responseErrorHandle } from 'commonUtils';
import * as Services from '../services';

export default {
  namespace: 'cLoanRecord',
  state: {
    approvalOrg: [],
    loanRecord: {
      data: [],
      total: 0,
    },
    repaymentDetails: {
      repaymentRecordROList: [],
    },

    // 借款记录列表搜索参数
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
    *fetchLoanRecord({ payload }, { call, put }) {
      const response = yield call(Services.reqLoanRecord, payload);
      if (response.success) {
        yield put({
          type: 'loanRecord',
          payload: response.result,
        });
      }
      responseErrorHandle(response);
    },
    *fetchLoanDetail({ payload }, { call, put }) {
      const response = yield call(Services.reqLoanDetail, payload);
      if (response.success) {
        yield put({
          type: 'repaymentDetails',
          payload: response.result,
        });
      }
      responseErrorHandle(response);
    },
  },
  reducers: {
    tableSearchParams(state, { payload }) {
      return {
        ...state,
        tableSearchParams: payload,
      };
    },
    approvalOrg(state, { payload }) {
      return {
        ...state,
        approvalOrg: payload,
      };
    },
    loanRecord(state, { payload }) {
      return {
        ...state,
        loanRecord: payload,
      };
    },
    repaymentDetails(state, { payload }) {
      return {
        ...state,
        repaymentDetails: payload,
      };
    },
  },

};

