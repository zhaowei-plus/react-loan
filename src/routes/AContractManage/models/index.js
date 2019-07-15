import {
  responseErrorHandle,
} from 'commonUtils';

import {
  reqContractManage,
  reqContractDetail,
} from '../services';

export default {
  namespace: 'contractManage',
  state: {
    tableQueryParams: {
      pageNo: 1,
      pageSize: 10,
    },
    contractManageList: {},
    contractManageDetail: {},
  },
  effects: {
    * getContractManageList({ payload }, { call, put }) {
      const res = yield call(reqContractManage, payload);
      if (res.success) {
        yield put({
          type: 'contractManageList',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
    * getContractDetail({ payload }, { call, put }) {
      const res = yield call(reqContractDetail, payload);
      if (res.success) {
        yield put({
          type: 'contractManageDetail',
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
    contractManageList(state, action) {
      return {
        ...state,
        contractManageList: action.payload,
      };
    },
    contractManageDetail(state, action) {
      return {
        ...state,
        contractManageDetail: action.payload,
      };
    },
  },

};

