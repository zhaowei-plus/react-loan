import { responseErrorHandle } from 'src/utils/commonUtil';
import {
  reqBasicProdList,
} from '../services';

export default {
  namespace: 'basicProdReleaseManage',
  state: {
    basicProdList: {
      data: [

      ],
    },
    tableQueryParams: {
      pageSize: 10,
      pageNo: 1,
      queryType: '1',
    },
    prodBaseConfig: {},
    prodDetail: {

    },
  },
  effects: {
    * getList({ payload }, { call, put }) {
      const res = yield call(reqBasicProdList, payload);

      if (res.success) {
        yield put({
          type: 'basicProdList',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
    },
  },
  reducers: {
    basicProdList(state, action) {
      return {
        ...state,
        basicProdList: action.payload,
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

