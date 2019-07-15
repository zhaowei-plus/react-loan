import { checkPagePermission } from '../services/app';

export default {
  namespace: 'privileges',

  state: {
  },

  effects: {
    * fetchPagePermit({ payload }, { call, put }) {
      const response = yield call(checkPagePermission, payload);
      if (response.success) {
        yield put({
          type: 'pagePermit',
          payload: {
            key: payload.pageId,
            response: response.result,
          },
        });
      }
    },
  },

  reducers: {
    pagePermit(state, action) {
      return {
        ...state,
        [`${action.payload.key}`]: action.payload.response,
      };
    },
  },
};
