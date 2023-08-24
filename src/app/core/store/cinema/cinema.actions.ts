import { createAction, props } from '@ngrx/store';
import { ShowtimesByMovieIdModel } from './cinema.model';

const GET_SHOWTIMES_BY_MOVIEID = '@Cinema/GetShowtimes';
const GET_SHOWTIMES_BY_MOVIEID_SUCCESS = '@Cinema/GetShowtimesSuccess';
const GET_SHOWTIMES_BY_MOVIEID_FAILED = '@Cinema/GetShowtimesFailed';

export const getShowtimesByMoieId = createAction(
  GET_SHOWTIMES_BY_MOVIEID,
  props<{ movieId: number }>()
);
export const getShowtimesByMoieIdSuccess = createAction(
  GET_SHOWTIMES_BY_MOVIEID_SUCCESS,
  props<{ showtimes: ShowtimesByMovieIdModel }>()
);
export const getShowtimesByMoieIdFailed = createAction(
  GET_SHOWTIMES_BY_MOVIEID_FAILED,
  props<{ error: string }>()
);
