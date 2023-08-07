import { createReducer, on } from '@ngrx/store';
import { AuthState } from './auth.state';
import * as AuthActions from './auth.actions';
import { LocalStorageService } from '../../services/local-storage.service';
import { AUTH } from '../../utils/interceptor.util';
import { Auth } from './auth.model';

const storageService = new LocalStorageService();
const initialState: AuthState = {
  auth: storageService.getObject<Auth>(AUTH) || null,
  status: 'idle',
  error: null,
};

export const authReducer = createReducer(
  initialState,
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
