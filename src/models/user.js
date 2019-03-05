import {
  query as queryUsers,
  queryCurrent,
  checkAuth,
  getUser,
  storeUser
} from '@/services/user';
import { stringify } from 'qs';
import {
  routerRedux
} from 'dva/router';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    * fetch(_, {
      call,
      put
    }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * fetchCurrent(_, {
      call,
      put
    }) {
      const isAuth = yield call(checkAuth);
      if (!isAuth) {
        routerRedux.replace('/user/login')
        return;
      }
      const response = yield call(getUser);
      if (!response) {
        yield put({type: 'login/logout'}
        );
        return;
      }
      yield put({
        type: 'saveCurrentUser',
        payload: response || {},
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      storeUser(action.payload);
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
