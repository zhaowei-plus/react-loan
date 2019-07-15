import { responseErrorHandle } from 'commonUtils';
import * as Services from '../services';

export default {
  namespace: 'cFundsFlow',
  state: {
    fundsFlows: {
      data: [],
      total: 0,
    },
  },
  effects: {
    *fetchFundsFlows({ payload }, { call, put }) {
      const response = yield call(Services.reqFundsFlows, payload);
      if (response.success) {
        yield put({
          type: 'fundsFlows',
          payload: response.result,
        });
      }
      responseErrorHandle(response);
      return response;
    },
  },
  reducers: {
    fundsFlows(state, { payload }) {
      return {
        ...state,
        fundsFlows: payload,
      };
    },
  },
};

