import { AuthState } from './auth/auth.state';
import {
  ThongTinLichChieuPhimState,
  ThongTinLichChieuHeThongRapState,
  ThongTinCumRapTheoHeThongState,
} from './cinema/cinema.state';
import {
  BannerState,
  MoviesPaginationState,
  MoviesState,
} from './movie/movie.state';

export interface AppState {
  feature_auth: AuthState;
  feature_banner: BannerState;
  feature_movies: MoviesState;
  feature_moviesPagination: MoviesPaginationState;
  feature_thongTinLichChieuPhim: ThongTinLichChieuPhimState;
  feature_thongTinLichChieuHeThongRap: ThongTinLichChieuHeThongRapState;
  feature_thongTinCumRapTheoHeThong: ThongTinCumRapTheoHeThongState;
}
