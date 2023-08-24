import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, RegisterState } from './auth.state';

const featureAuth = createFeatureSelector<AuthState>('feature_auth');
const featureARegister =
  createFeatureSelector<RegisterState>('feature_register');

export const authSeclector = createSelector(featureAuth, (state) => state.auth);
export const authStatusSelector = createSelector(
  featureAuth,
  (state) => state.status
);
export const authErrorSelector = createSelector(
  featureAuth,
  (state) => state.error
);

export const registerStatusSelector = createSelector(
  featureARegister,
  (state) => state.status
);
export const registerErrorSelector = createSelector(
  featureARegister,
  (state) => state.error
);
