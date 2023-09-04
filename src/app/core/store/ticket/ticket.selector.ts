import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DanhSachPhongVeState } from './ticket.state';

const featureDanhSachPhongVe = createFeatureSelector<DanhSachPhongVeState>(
  'feature_danhSachPhongVe'
);

export const danhSachPhongVeSelector = createSelector(
  featureDanhSachPhongVe,
  (state) => state.danhSachPhongVe
);
export const danhSachPhongVeStatusSelector = createSelector(
  featureDanhSachPhongVe,
  (state) => state.status
);
