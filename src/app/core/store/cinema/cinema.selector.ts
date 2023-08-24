import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShowtimesByMovieIdState } from './cinema.state';

const featureShowtimesByMovieId =
  createFeatureSelector<ShowtimesByMovieIdState>('feature_showtimesByMovieId');

export const showtimesSelector = createSelector(
  featureShowtimesByMovieId,
  (state) => state.showtimes
);
export const showtimesStatusSelector = createSelector(
  featureShowtimesByMovieId,
  (state) => state.status
);
