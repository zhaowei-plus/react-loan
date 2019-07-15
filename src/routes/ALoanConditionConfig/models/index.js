import {
  reqConditionList,
  reqUpdateCondition,
} from '../services';

export default {
  namespace: 'loanConditionConfig',
  state: {
    conditionList: {
      total: 0,
      data: [],
    },
    tableQueryParams: {},
  },
  effects: {
    * getList({ payload }, { call, put }) {
      const res = yield call(reqConditionList, payload);

      if (res.success) {
        yield put({
          type: 'conditionList',
          payload: res.result,
        });
      }
    },
    * updateCondition({ payload }, { call }) {
      return yield call(reqUpdateCondition, payload);
    },
  },
  reducers: {
    conditionList(state, action) {
      return {
        ...state,
        conditionList: action.payload,
      };
    },
    tableQueryParams(state, action) {
      return {
        ...state,
        tableQueryParams: action.payload,
      };
    },
  },

};

