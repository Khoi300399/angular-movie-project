import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

const featureAuth = createFeatureSelector<AuthState>('feature_auth');
export const authSeclector = createSelector(featureAuth, (state) => state.auth);
export const authStatusSelector = createSelector(
  featureAuth,
  (state) => state.status
);
export const authErrorSelector = createSelector(
  featureAuth,
  (state) => state.error
);
