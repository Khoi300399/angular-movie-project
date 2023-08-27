import { createReducer, on } from '@ngrx/store';
import {
  ThongTinLichChieuPhimState,
  ThongTinCumRapTheoHeThongState,
  ThongTinLichChieuHeThongRapState,
} from './cinema.state';
import * as CinemaActions from './cinema.actions';

const initialShowtimesByMovieId: ThongTinLichChieuPhimState = {
  lichChieuPhim: null,
  status: 'idle',
  error: null,
};
const initialThongTinLichChieu: ThongTinLichChieuHeThongRapState = {
  thongTinLichChieu: [],
  status: 'idle',
  error: null,
};
const initialThongTinCumRap: ThongTinCumRapTheoHeThongState = {
  thongTinCumRap: [],
  status: 'idle',
  error: null,
};

export const thongTinLichChieuPhimReducer = createReducer(
  initialShowtimesByMovieId,
  on(
    CinemaActions.layThongTinLichChieuPhim,
    (state): ThongTinLichChieuPhimState => ({
      ...state,
      status: 'loading',
    })
  ),
  on(
    CinemaActions.layThongTinLichChieuPhimSuccess,
    (state, { lichChieuPhim }): ThongTinLichChieuPhimState => ({
      ...state,
      status: 'loaded',
      lichChieuPhim,
    })
  ),
  on(
    CinemaActions.layThongTinLichChieuPhimFailed,
    (state, { error }): ThongTinLichChieuPhimState => ({
      ...state,
      status: 'error',
      error,
    })
  )
);

export const thongTinLichChieuHeThongRapReducer = createReducer(
  initialThongTinLichChieu,
  on(
    CinemaActions.layThongTinLichChieuHeThongRap,
    (state): ThongTinLichChieuHeThongRapState => ({
      ...state,
      status: 'loading',
    })
  ),
  on(
    CinemaActions.layThongTinLichChieuHeThongRapSuccess,
    (state, { thongTinLichChieu }): ThongTinLichChieuHeThongRapState => ({
      ...state,
      status: 'loaded',
      thongTinLichChieu,
    })
  ),
  on(
    CinemaActions.layThongTinLichChieuHeThongRapFailed,
    (state, { error }): ThongTinLichChieuHeThongRapState => ({
      ...state,
      status: 'error',
      error,
    })
  )
);

export const thongTinCumRapReducer = createReducer(
  initialThongTinCumRap,
  on(
    CinemaActions.layThongTinCumRapTheoHeThong,
    (state): ThongTinCumRapTheoHeThongState => ({
      ...state,
      status: 'loading',
    })
  ),
  on(
    CinemaActions.layThongTinCumRapTheoHeThongSuccess,
    (state, { thongTinCumRap }): ThongTinCumRapTheoHeThongState => ({
      ...state,
      status: 'loaded',
      thongTinCumRap,
    })
  ),
  on(
    CinemaActions.layThongTinCumRapTheoHeThongFailed,
    (state, { error }): ThongTinCumRapTheoHeThongState => ({
      ...state,
      status: 'error',
      error,
    })
  )
);
