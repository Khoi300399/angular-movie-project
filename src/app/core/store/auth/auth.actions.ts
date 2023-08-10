import { createAction, props } from '@ngrx/store';
import { Auth, Credentials, RegisterModel } from './auth.model';

export const LOGIN = '@Auth/Login';
export const LOGIN_SUCCESS = '@Auth/LoginSuccess';
export const LOGIN_FAILED = '@Auth/LoginFailed';

export const REGISTER = '@Auth/createAccount';
export const REGISTER_SUCCESS = '@Auth/createAccountSuccess';
export const REGISTER_FAILED = '@Auth/createAccountFailed';

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

// export type AuthActions =
//   | ActionType<typeof login>
//   | ActionType<typeof loginSuccess>
//   | ActionType<typeof loginFailed>;
