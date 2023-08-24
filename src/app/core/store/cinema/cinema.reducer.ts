import { createReducer, on } from '@ngrx/store';
import { ShowtimesByMovieIdState } from './cinema.state';
import * as CinemaActions from './cinema.actions';

const initialShowtimesByMovieId: ShowtimesByMovieIdState = {
  showtimes: null,
  status: 'idle',
  error: null,
};

export const showtimesByMovieIdReducer = createReducer(
  initialShowtimesByMovieId,
  on(
    CinemaActions.getShowtimesByMoieId,
    (state): ShowtimesByMovieIdState => ({
      ...state,
      status: 'loading',
    })
  ),
  on(
    CinemaActions.getShowtimesByMoieIdSuccess,
    (state, { showtimes }): ShowtimesByMovieIdState => ({
      ...state,
      status: 'loaded',
      showtimes,
    })
  ),
  on(
    CinemaActions.getShowtimesByMoieIdFailed,
    (state, { error }): ShowtimesByMovieIdState => ({
      ...state,
      status: 'error',
      error,
    })
  )
);
