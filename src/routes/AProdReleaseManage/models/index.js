import { responseErrorHandle } from 'src/utils/commonUtil';
import {
  reqReleaseList,
  reqProdToggleStatus,
  reqRegion,
  reqSupplierList,
  reqProdDetail,
} from '../services';

export default {
  namespace: 'prodReleaseManage',
  state: {
    releaseList: {
      total: 0,
      data: [

      ],
    },
    tableQueryParams: {
      pageSize: 10,
      pageNo: 1,
      tabType: '1',
    },
    prodBaseConfig: {},
    prodDetail: {

    },
  },
  effects: {
    * getList({ payload }, { call, put }) {
      const res = yield call(reqReleaseList, payload);

      if (res.success && res.result) {
        yield put({
          type: 'releaseList',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
    },
    * toggleStatus({ payload }, { call }) {
      return yield call(reqProdToggleStatus, payload);
    },
    * getRegion({ payload }, { call }) {
      const res = yield call(reqRegion, payload);
      return res;
    },
    * getSupplier({ payload }, { call }) {
      return yield call(reqSupplierList, payload);
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
  },
  reducers: {
    releaseList(state, action) {
      return {
        ...state,
        releaseList: action.payload,
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
  },
};

