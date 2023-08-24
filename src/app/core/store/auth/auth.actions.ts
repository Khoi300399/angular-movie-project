import { createAction, props } from '@ngrx/store';
import { Auth, Credentials, RegisterModel } from './auth.model';

const LOGIN = '@Auth/Login';
const LOGIN_SUCCESS = '@Auth/LoginSuccess';
const LOGIN_FAILED = '@Auth/LoginFailed';
const LOGOUT = '@Auth/Logout';

const REGISTER = '@Auth/createAccount';
const REGISTER_SUCCESS = '@Auth/createAccountSuccess';
const REGISTER_FAILED = '@Auth/createAccountFailed';

// LOGIN
export const login = createAction(LOGIN, props<{ credentials: Credentials }>());
export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ auth: Auth }>()
);
export const loginFailed = createAction(
  LOGIN_FAILED,
  props<{ error?: string }>()
);

// REGISTER
export const register = createAction(
  REGISTER,
  props<{ user: RegisterModel }>()
);
export const registerSuccess = createAction(REGISTER_SUCCESS);
export const registerFailed = createAction(
  REGISTER_FAILED,
  props<{ error?: string }>()
);
// LOGOUT
export const logOut = createAction(LOGOUT);

// export type AuthActions =
//   | ActionType<typeof login>
//   | ActionType<typeof loginSuccess>
//   | ActionType<typeof loginFailed>;
