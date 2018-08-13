import * as AuthActs from './auth.actions';

export interface AuthState {
  token: string;
  authenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  authenticated: false
};

export function authReducer(state = initialState, action: AuthActs.AuthActions) {
  switch (action.type) {
    case AuthActs.SIGNUP:
    case AuthActs.SIGNIN:
      console.log('do sign up / sign in');
      return {
        ...state,
        authenticated: true
      };

    case AuthActs.LOGOUT:
      console.log('do logout');
      return {
        ...state,
        authenticated: false
      };

    case AuthActs.SET_TOKEN:
      console.log('do set token');
      return {
        ...state,
        authenticated: true,
        token: action.payload
      };

    default:
      return state;
  }
}
