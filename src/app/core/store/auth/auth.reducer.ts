import { createReducer, on } from '@ngrx/store';
import { AuthState, RegisterState } from './auth.state';
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
      status: 'loaded',
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
