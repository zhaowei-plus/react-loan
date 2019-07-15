import { responseErrorHandle } from 'commonUtils';
import {
  reqHelpCenterInfo,
  reqAccountInfo,
  reqRecommend,
  reqHotRecommend,
  reqLoanAbleBidItems,
  reqRecommendByBidItem,
} from '../services';


export default {
  namespace: 'customerLoanOverview',
  state: {
    accountStatistics: {},
    helpCenterInfo: [],
    recommendProds: [],
    hotRecommend: [],
    loanAbleBidItems: [],
  },
  effects: {
    * getAccountStatistics({ payload }, { put, call }) {
      const res = yield call(reqAccountInfo, payload);

      if (res.success) {
        yield put({
          type: 'accountStatistics',
          payload: res.result,
        });
      }

      responseErrorHandle(res);
      return res;
    },

    * getRecommend({ payload }, { put, call }) {
      const res = yield call(reqRecommend, payload);

      if (res.success) {
        yield put({
          type: 'recommendProds',
          payload: res.result,
        });
      }

      responseErrorHandle(res);
      return res;
    },

    * getRecommendByBidItem({ payload }, { put, call }) {
      const res = yield call(reqRecommendByBidItem, payload);

      if (res.success) {
        yield put({
          type: 'recommendProds',
          payload: res.result,
        });
      }

      responseErrorHandle(res);
      return res;
    },

    * getHelpCenterInfo({ payload }, { put, call }) {
      let res;

      try {
        res = yield call(reqHelpCenterInfo, payload);
      } catch (e) {
        res = {};
      }

      if (res.successFlag) {
        yield put({
          type: 'helpCenterInfo',
          payload: res.articles,
        });
      }

      return res;
    },

    * getHotRecommend({ payload }, { put, call }) {
      const res = yield call(reqHotRecommend, payload);

      if (res.success) {
        yield put({
          type: 'hotRecommend',
          payload: res.result,
        });
      }

      return res;
    },
    * getLoanAbleBidItems({ payload }, { put, call }) {
      const res = yield call(reqLoanAbleBidItems, payload);

      if (res.success) {
        yield put({
          type: 'loanAbleBidItems',
          payload: res.result,
        });
      }

      return res;
    },


  },
  reducers: {
    accountStatistics(state, action) {
      return {
        ...state,
        accountStatistics: action.payload,
      };
    },
    helpCenterInfo(state, action) {
      return {
        ...state,
        helpCenterInfo: action.payload,
      };
    },
    recommendProds(state, action) {
      return {
        ...state,
        recommendProds: action.payload,
      };
    },

    hotRecommend(state, action) {
      return {
        ...state,
        hotRecommend: action.payload,
      };
    },

    loanAbleBidItems(state, action) {
      return {
        ...state,
        loanAbleBidItems: action.payload,
      };
    },
  },

};

