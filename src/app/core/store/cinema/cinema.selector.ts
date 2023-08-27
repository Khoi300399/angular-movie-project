import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ThongTinLichChieuPhimState,
  ThongTinCumRapTheoHeThongState,
  ThongTinLichChieuHeThongRapState,
} from './cinema.state';

const featureThongTinLichChieuPhim =
  createFeatureSelector<ThongTinLichChieuPhimState>(
    'feature_thongTinLichChieuPhim'
  );
const featureThongTinLichChieu =
  createFeatureSelector<ThongTinLichChieuHeThongRapState>(
    'feature_thongTinLichChieuHeThongRap'
  );
const featureThongTinCumRap =
  createFeatureSelector<ThongTinCumRapTheoHeThongState>(
    'feature_thongTinCumRap'
  );

export const lichChieuPhimSelector = createSelector(
  featureThongTinLichChieuPhim,
  (state) => state.lichChieuPhim
);
export const lichChieuPhimStatusSelector = createSelector(
  featureThongTinLichChieuPhim,
  (state) => state.status
);

export const thongTinLichChieuheThongRapSelector = createSelector(
  featureThongTinLichChieu,
  (state) => state.thongTinLichChieu
);
export const thongTinLichChieuHeThongRapStatusSelector = createSelector(
  featureThongTinLichChieu,
  (state) => state.status
);

export const thongTinCumRapSelector = createSelector(
  featureThongTinCumRap,
  (state) => state.thongTinCumRap
);
export const thongTinCumRapStatusSelector = createSelector(
  featureThongTinCumRap,
  (state) => state.status
);
