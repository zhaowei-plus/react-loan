import {
  responseErrorHandle,
} from 'commonUtils';

import {
  reqServiceCharge,
} from '../services';

export default {
  namespace: 'serviceChargeManage',
  state: {
    tableQueryParams: {
      pageNo: 1,
      pageSize: 10,
      type: '1',
    },
    serviceChargeList: {},
  },
  effects: {
    * getServiceChargeList({ payload }, { call, put }) {
      const res = yield call(reqServiceCharge, payload);
      if (res.success) {
        yield put({
          type: 'serviceChargeList',
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
    serviceChargeList(state, action) {
      return {
        ...state,
        serviceChargeList: action.payload,
      };
    },
  },

};

