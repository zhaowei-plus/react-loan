import { responseErrorHandle } from 'commonUtils';
import {
  reqWeekData,
  reqApplyList,
  reqStatistics,
  reqClearTest,
} from '../services';

export default {
  namespace: 'adminLoanOverview',
  state: {
    statistics: {

    },
    weekData: {

    },
    applyList: {

    },
  },
  effects: {
    * getStatistics({ payload }, { put, call }) {
      const res = yield call(reqStatistics, payload);

      if (res.success) {
        yield put({
          type: 'statistics',
          payload: res.result,
        });
      }

      responseErrorHandle(res);
      return res;
    },

    * getWeekData({ payload }, { put, call }) {
      const res = yield call(reqWeekData, payload);


      if (res.success) {
        yield put({
          type: 'weekData',
          payload: res.result,
        });
      }

      responseErrorHandle(res);
      return res;
    },

    * getApplyList({ payload }, { put, call }) {
      const res = yield call(reqApplyList, payload);


      if (res.success) {
        yield put({
          type: 'applyList',
          payload: res.result,
        });
      }

      responseErrorHandle(res);
      return res;
    },

    * clearTest({ payload }, { call }) {
      const res = yield call(reqClearTest, payload);
      responseErrorHandle(res);
      return res;
    },
  },
  reducers: {
    statistics(state, action) {
      return {
        ...state,
        statistics: action.payload,
      };
    },
    weekData(state, action) {
      return {
        ...state,
        weekData: action.payload,
      };
    },
    applyList(state, action) {
      return {
        ...state,
        applyList: action.payload,
      };
    },
  },

};

