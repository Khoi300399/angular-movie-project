import { ActionType, createAction, props } from '@ngrx/store';
import { Auth, Credentials } from './auth.model';

export const LOGIN = '@Auth/Login';
export const LOGIN_SUCCESS = '@Auth/LoginSuccess';
export const LOGIN_FAILED = '@Auth/LoginFailed';

export const login = createAction(LOGIN, props<{ credentials: Credentials }>());
export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ auth: Auth }>()
);
export const loginFailed = createAction(
  LOGIN_FAILED,
  props<{ error?: number }>()
);

// export type AuthActions =
//   | ActionType<typeof login>
//   | ActionType<typeof loginSuccess>
//   | ActionType<typeof loginFailed>;
