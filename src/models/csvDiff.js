import produce from 'immer';
import prefixNamespace from '@/shared/utils/prefixNamespace';
import localStorage from '@/shared/utils/localStorage';

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
