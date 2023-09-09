import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, RegisterState, ThongTinTaiKhoanState } from './auth.state';

const featureAuth = createFeatureSelector<AuthState>('feature_auth');
const featureRegister =
  createFeatureSelector<RegisterState>('feature_register');
const featureThongTinTaiKhoan = createFeatureSelector<ThongTinTaiKhoanState>(
  'feature_thongTinTaiKhoan'
);

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
  featureRegister,
  (state) => state.status
);

export const thongTinTaiKhoanSelector = createSelector(
  featureThongTinTaiKhoan,
  (state) => state.thongTinTaiKhoan
);
export const thongTinTaiKhoanStatusSelector = createSelector(
  featureThongTinTaiKhoan,
  (state) => state.status
);
