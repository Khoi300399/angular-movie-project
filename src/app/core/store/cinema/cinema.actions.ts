import { createAction, props } from '@ngrx/store';
import {
  ThongTinLichChieuPhimModel,
  ThongTinCumRapTheoHeThongModel,
  ThongTinLichChieuHeThongRapModel,
} from './cinema.model';

const LAy_THONGTIN_LICHCHIEUPHIM = '@Cinema/GetShowtimes';
const LAy_THONGTIN_LICHCHIEUPHIM_SUCCESS = '@Cinema/GetShowtimesSuccess';
const LAy_THONGTIN_LICHCHIEUPHIM_FAILED = '@Cinema/GetShowtimesFailed';
const LAY_THONGTIN_LICHCHIEU_HETHONGRAP =
  '@Cinema/LayThongTinLichChieuHeThongRap';
const LAY_THONGTIN_LICHCHIEU_HETHONGRAP_SUCCESS =
  '@Cinema/LayThongTinLichChieuHeThongRapSuccess';
const LAY_THONGTIN_LICHCHIEU_HETHONGRAP_FAILED =
  '@Cinema/LayThongTinLichChieuHeThongRapFailed';
const LAY_THONGTIN_CUMRAP_THEO_HETHONG = '@Cinema/LayThongTinCumRapTheoHeThong';
const LAY_THONGTIN_CUMRAP_THEO_HETHONG_SUCCESS =
  '@Cinema/LayThongTinCumRapTheoHeThongSuccess';
const LAY_THONGTIN_CUMRAP_THEO_HETHONG_FAILED =
  '@Cinema/LayThongTinCumRapTheoHeThongFailed';

export const layThongTinLichChieuPhim = createAction(
  LAy_THONGTIN_LICHCHIEUPHIM,
  props<{ maPhim: number }>()
);
export const layThongTinLichChieuPhimSuccess = createAction(
  LAy_THONGTIN_LICHCHIEUPHIM_SUCCESS,
  props<{ lichChieuPhim: ThongTinLichChieuPhimModel }>()
);
export const layThongTinLichChieuPhimFailed = createAction(
  LAy_THONGTIN_LICHCHIEUPHIM_FAILED,
  props<{ error: string }>()
);

export const layThongTinLichChieuHeThongRap = createAction(
  LAY_THONGTIN_LICHCHIEU_HETHONGRAP
);
export const layThongTinLichChieuHeThongRapSuccess = createAction(
  LAY_THONGTIN_LICHCHIEU_HETHONGRAP_SUCCESS,
  props<{ thongTinLichChieu: ThongTinLichChieuHeThongRapModel[] }>()
);
export const layThongTinLichChieuHeThongRapFailed = createAction(
  LAY_THONGTIN_LICHCHIEU_HETHONGRAP_FAILED,
  props<{ error: string }>()
);

export const layThongTinCumRapTheoHeThong = createAction(
  LAY_THONGTIN_CUMRAP_THEO_HETHONG,
  props<{ maHeThongRap: string }>()
);
export const layThongTinCumRapTheoHeThongSuccess = createAction(
  LAY_THONGTIN_CUMRAP_THEO_HETHONG_SUCCESS,
  props<{ thongTinCumRap: ThongTinCumRapTheoHeThongModel[] }>()
);
export const layThongTinCumRapTheoHeThongFailed = createAction(
  LAY_THONGTIN_CUMRAP_THEO_HETHONG_FAILED,
  props<{ error: string }>()
);
