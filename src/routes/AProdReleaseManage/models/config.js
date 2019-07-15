import { responseErrorHandle } from 'commonUtils';
import {
  reqLoanCondition,
  reqProdDetail,
  reqUpdateProd,
  reqBasicProdConfigDetail,
  reqUpdateBasicProdConfig,
  reqChargeTypes,
  reqChannelList,
  reqDistTree,
  reqProcessList,
  reqProductTypeList,
} from '../services/config';

export default {
  namespace: 'prodReleaseConfig',
  state: {
    prodBaseConfig: {},
    prodDetail: {

    },
    loanCondition: [],
    channelList: [],
    processList: [],
    productTypeList: [],
  },
  effects: {
    * updateBasicProdConfig({ payload }, { call }) {
      const res = yield call(reqUpdateBasicProdConfig, payload);
      responseErrorHandle(res);
      return res;
    },
    * getBasicProdConfigDetail({ payload }, { call, put }) {
      const res = yield call(reqBasicProdConfigDetail, payload);

      if (res.success) {
        yield put({
          type: 'prodDetail',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
    * updateProd({ payload }, { call }) {
      const res = yield call(reqUpdateProd, payload);
      responseErrorHandle(res);
      return res;
    },
    * getProdDetail({ payload }, { call, put }) {
      const res = yield call(reqProdDetail, payload);

      if (res.success) {
        yield put({
          type: 'prodDetail',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
    * getChannelList({ payload }, { call, put }) {
      const res = yield call(reqChannelList, payload);
      if (res.success) {
        yield put({
          type: 'channelList',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },
    * getLoanCondition({ payload }, { call, put }) {
      const res = yield call(reqLoanCondition, payload);

      if (res.success) {
        yield put({
          type: 'loanCondition',
          payload: res.result,
        });
      }
      return res;
    },
    * getChargeTypes({ payload }, { call, put }) {
      const res = yield call(reqChargeTypes, payload);

      if (res.success) {
        yield put({
          type: 'chargeTypes',
          payload: res.result,
        });
      }
      return res;
    },

    * getDistTree({ payload }, { call, put }) {
      const res = yield call(reqDistTree, payload);

      const transFrom = (treeData = []) => {
        treeData.forEach((item) => {
          item.value = item.code;
          item.label = item.name;

          if (item.children) {
            transFrom(item.children);
          }
        });
        return treeData;
      };

      if (res.success) {
        yield put({
          type: 'distTree',
          payload: transFrom(res.data),
        });
      }
      return res;
    },

    * getProcessList({ payload }, { call, put }) {
      const res = yield call(reqProcessList, payload);
      if (res.success) {
        yield put({
          type: 'processList',
          payload: res.result,
        });
      }
      return res;
    },
    * getProductTypeList({ payload }, { call, put }) {
      const res = yield call(reqProductTypeList, payload);
      if (res.success) {
        yield put({
          type: 'productTypeList',
          payload: res.result,
        });
      }
      return res;
    },

  },
  reducers: {
    loanCondition(state, action) {
      return {
        ...state,
        loanCondition: action.payload,
      };
    },
    tableQueryParams(state, action) {
      return {
        ...state,
        tableQueryParams: action.payload,
      };
    },
    prodDetail(state, action) {
      return {
        ...state,
        prodDetail: action.payload,
      };
    },
    clearProdDetail(state) {
      return {
        ...state,
        prodDetail: {},
      };
    },
    chargeTypes(state, action) {
      return {
        ...state,
        chargeTypes: action.payload,
      };
    },
    channelList(state, action) {
      return {
        ...state,
        channelList: action.payload,
      };
    },
    distTree(state, action) {
      return {
        ...state,
        distTree: action.payload,
      };
    },
    processList(state, action) {
      return {
        ...state,
        processList: action.payload,
      };
    },
    productTypeList(state, action) {
      return {
        ...state,
        productTypeList: action.payload,
      };
    },
  },
};

