import { responseErrorHandle } from 'commonUtils';
import * as Services from '../services';

export default {
  namespace: 'cLoanApply',
  state: {
    applyRecordDetail: {
      applyInfo: {},
      approveInfo: {},
      contractInfo: {},
      estimateInfo: {},
      projectInfo: {},
      customerInfo: {},
    },
  },
  effects: {
    *fetchApplyRecordDetail({ payload }, { call, put }) {
      const response = yield call(Services.reqLoanApplyDetail, payload);
      if (response.success) {
        yield put({
          type: 'applyRecordDetail',
          payload: response.result,
        });
      }
      responseErrorHandle(response);
    },
  },
  reducers: {
    applyRecordDetail(state, { payload }) {
      return {
        ...state,
        applyRecordDetail: payload,
      };
    },
  },
};

