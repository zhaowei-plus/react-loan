import { responseErrorHandle } from 'commonUtils';
import {
  reqProjectRecord,
} from '../services';

export default {
  namespace: 'cWinbidProjectRecord',
  state: {
    projectRecord: [],

    tableSearchParams: {
      pageNo: 1,
      pageSize: 10,
      tab: '1',
    },
  },
  effects: {
    * fetchProjectRecord({ payload }, { call, put }) {
      const response = yield call(reqProjectRecord, payload);
      if (response.success) {
        yield put({
          type: 'projectRecord',
          payload: response.result,
        });
      }
      responseErrorHandle(response);
      return response;
    },
  },
  reducers: {
    tableSearchParams(state, { payload }) {
      return {
        ...state,
        tableSearchParams: payload,
      };
    },
    projectRecord(state, { payload }) {
      return {
        ...state,
        projectRecord: payload,
      };
    },
  },

};

