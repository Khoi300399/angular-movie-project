import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { authReducer, registerReducer } from './store/auth/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import {
  bannerReducer,
  movieByIdReducer,
  moviePaginationReducer,
  moviesByNameReducer,
  moviesReducer,
} from './store/movie/movie.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { MoviesEffects } from './store/movie/movie.effects';
import { CinemaEffects } from './store/cinema/cinema.effects';
import {
  thongTinCumRapReducer,
  thongTinLichChieuPhimReducer,
  thongTinLichChieuHeThongRapReducer,
} from './store/cinema/cinema.reducer';
import { ticketByShowtimesIdReducer } from './store/ticket/ticket.reducer';
import { TicketEffects } from './store/ticket/ticket.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('feature_auth', authReducer),
    StoreModule.forFeature('feature_register', registerReducer),
    StoreModule.forFeature('feature_banner', bannerReducer),
    StoreModule.forFeature('feature_movies', moviesReducer),
    StoreModule.forFeature('feature_moviesByName', moviesByNameReducer),
    StoreModule.forFeature('feature_movieById', movieByIdReducer),
    StoreModule.forFeature('feature_moviesPagination', moviePaginationReducer),
    StoreModule.forFeature(
      'feature_ticketByShowtimesId',
      ticketByShowtimesIdReducer
    ),
    StoreModule.forFeature(
      'feature_thongTinLichChieuPhim',
      thongTinLichChieuPhimReducer
    ),
    StoreModule.forFeature(
      'feature_thongTinLichChieuHeThongRap',
      thongTinLichChieuHeThongRapReducer
    ),
    StoreModule.forFeature('feature_thongTinCumRap', thongTinCumRapReducer),
    EffectsModule.forFeature([AuthEffects]),
    EffectsModule.forFeature([MoviesEffects]),
    EffectsModule.forFeature([CinemaEffects]),
    EffectsModule.forFeature([TicketEffects]),
  ],
})
export class CoreModule {}
