import { createReducer, on } from '@ngrx/store';
import { AuthState, RegisterState, ThongTinTaiKhoanState } from './auth.state';
import * as AuthActions from './auth.actions';
import { LocalStorageService } from '../../services/local-storage.service';
import { AUTH } from '../../utils/interceptor.util';
import { Auth } from './auth.model';

const storageService = new LocalStorageService();
const initialAuthState: AuthState = {
  auth: storageService.getObject<Auth>(AUTH) || null,
  status: 'idle',
  error: null,
};
const initialRegisterState: RegisterState = {
  status: 'idle',
  error: null,
};
const initialThongTinTaiKhoanState: ThongTinTaiKhoanState = {
  thongTinTaiKhoan: null,
  status: 'idle',
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(
    AuthActions.login,
    (state): AuthState => ({ ...state, status: 'loading' })
  ),
  on(
    AuthActions.loginSuccess,
    (state, action): AuthState => ({
      ...state,
      auth: action.auth,
      status: 'loaded',
    })
  ),
  on(
    AuthActions.loginFailed,
    (state, action): AuthState => ({
      ...state,
      status: 'error',
      error: action.error,
    })
  ),
  on(
    AuthActions.logOut,
    (state): AuthState => ({
      ...state,
      status: 'idle',
      error: null,
      auth: null,
    })
  )
);

export const registerReducer = createReducer(
  initialRegisterState,
  on(
    AuthActions.register,
    (state): AuthState => ({ ...state, status: 'loading' })
  ),
  on(
    AuthActions.registerSuccess,
    (state): AuthState => ({
      ...state,
    })
  ),
  on(
    AuthActions.registerFailed,
    (state, action): AuthState => ({
      ...state,
      status: 'error',
      error: action.error,
    })
  )
);
export const thongTinTaiKhoanReducer = createReducer(
  initialThongTinTaiKhoanState,
  on(
    AuthActions.layThongTinTaiKhoan,
    (state): ThongTinTaiKhoanState => ({ ...state, status: 'loading' })
  ),
  on(
    AuthActions.layThongTinTaiKhoanSuccess,
    (state, { thongTinTaiKhoan }): ThongTinTaiKhoanState => ({
      ...state,
      status: 'loaded',
      thongTinTaiKhoan,
    })
  ),
  on(
    AuthActions.layThongTinTaiKhoanFailed,
    (state, { error }): ThongTinTaiKhoanState => ({
      ...state,
      status: 'error',
      error: error,
    })
  )
);
