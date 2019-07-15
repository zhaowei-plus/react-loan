import {
  responseErrorHandle,
} from 'commonUtils';

import {
  reqContractRecord,
} from '../services';

export default {
  namespace: 'contractRecord',
  state: {
    tableQueryParams: {
      pageNo: 1,
      pageSize: 10,
    },
    contractRecordList: {},
  },
  effects: {
    * fetchContractRecordList({ payload }, { call, put }) {
      const res = yield call(reqContractRecord, payload);
      if (res.success) {
        yield put({
          type: 'contractRecordList',
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
    contractRecordList(state, action) {
      return {
        ...state,
        contractRecordList: action.payload,
      };
    },
  },
};

