import produce from 'immer';
import prefixNamespace from '@/shared/utils/prefixNamespace';
import localStorage from '@/shared/utils/localStorage';
import * as API from '@/api';
import locationServices from '@/shared/services/location/locationServices';

const namespace = 'login';

const actionTypes = {
  LOGIN_EFFECT: 'login',
  SET_LOGIN_USER_INFO: 'setLoginUserInfo',
  SET_LOGIN_ERROR: 'setLoginError'
};
export const signActions = prefixNamespace(namespace, actionTypes);

const initialState = {
  id: '',
  error: '',
  userInfo: {}
};

const Model = {
  namespace,
  state: initialState,

  effects: {
    * [actionTypes.LOGIN_EFFECT]({ payload }, { call, put }) {
      try {
        const { body: { adminLogin } } = yield call(API.login, { data: payload });
        const { token, nickName, userId, authorityList, roleList } = adminLogin;
        yield put({ type: actionTypes.SET_LOGIN_USER_INFO, payload: { userInfo: adminLogin } });
        localStorage.set('token', token);
        const userInfo = { nickName, userId, roleList };
        localStorage.set('userId', userId);
        localStorage.setObject('userInfo', userInfo);

        const authorityMap = {};
        authorityList.forEach(value => {
          authorityMap[value] = true;
        });
        localStorage.setObject('authorityMap', authorityMap);
      } catch (data) {
        yield put({ type: actionTypes.SET_LOGIN_ERROR, payload: { error: data.message } });
      }
    }
  },

  reducers: {
    [actionTypes.SET_LOGIN_ERROR](state, { payload: { error } }) {
      return produce(state, draftState => {
        draftState.error = error;
      });
    },
    [actionTypes.SET_LOGIN_USER_INFO](state, { payload: { userInfo } }) {
      return produce(state, draftState => {
        draftState.userInfo = userInfo;
      });
    }
  }
};

export default Model;
