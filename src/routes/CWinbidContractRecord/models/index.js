import { responseErrorHandle } from 'commonUtils';
import {
  reqContractRecord,
} from '../services';

export default {
  namespace: 'cWinbidContractRecord',
  state: {
    contractRecord: {},
  },
  effects: {
    * fetchContractRecord({ payload }, { call, put }) {
      const response = yield call(reqContractRecord, payload);
      if (response.success) {
        yield put({
          type: 'contractRecord',
          payload: response.result,
        });
      }
      responseErrorHandle(response);
    },
  },
  reducers: {
    contractRecord(state, { payload }) {
      return {
        ...state,
        contractRecord: payload,
      };
    },
  },

};

