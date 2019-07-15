import { responseErrorHandle } from 'src/utils/commonUtil';
import {
  reqProdDetail,
  reqActionRecord,
  reqSupplierCompleteInfo,
  reqMeasureCredit,
  reqBidItemList,
} from '../services';


export default {
  namespace: 'productDetail',
  state: {
    prodDetail: {},
    bidItemList: {
      total: 0,
      data: [],
    },
  },
  effects: {
    * getProdDetail({ payload }, { call, put }) {
      const { method } = payload;
      const res = yield call(reqProdDetail, payload);
      if (res.success && method === 'get') {
        const productDetail = res.result;

        if (productDetail.problem) {
          /**
           * 输入的约定
           * /n 换行
           * /t 代表标题的结束，标题与内容的分隔符
           * @type {{id: number, title: string, content: string}[]}
           */
          productDetail.problem = productDetail.problem.split('/n').filter(item => !!item).map((item, index) => {
            const [title, content] = item.split('/t');
            return {
              id: index,
              title,
              content,
            };
          });
        } else {
          productDetail.problem = [];
        }
        yield put({
          type: 'prodDetail',
          payload: res.result,
        });
      }

      responseErrorHandle(res);
      return res;
    },

    * measureCredit({ payload }, { call }) {
      const res = yield call(reqMeasureCredit, payload);

      responseErrorHandle(res);
      return res;
    },

    * recordAction({ payload }, { call }) {
      return yield call(reqActionRecord, {
        actionType: payload,
      });
    },

    * supplierCompleteInfo({ payload }, { call }) {
      const res = yield call(reqSupplierCompleteInfo, payload);
      responseErrorHandle(res);
      return res;
    },
    * getBidItemList({ payload }, { call, put }) {
      const res = yield call(reqBidItemList, payload);
      if (res.success) {
        yield put({
          type: 'bidItemList',
          payload: res.result,
        });
      }
      responseErrorHandle(res);
      return res;
    },

  },
  reducers: {
    prodDetail(state, action) {
      return {
        ...state,
        prodDetail: action.payload,
      };
    },
    bidItemList(state, action) {
      return {
        ...state,
        bidItemList: action.payload,
      };
    },
  },
};

