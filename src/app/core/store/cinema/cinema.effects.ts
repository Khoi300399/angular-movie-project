import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CinemaActions from './cinema.actions';
import { catchError, exhaustMap, map, of, pipe, tap } from 'rxjs';
import { CinemaService } from '../../services/cinema.service';
import { ShowtimesByMovieIdRes } from './cinema.model';

@Injectable()
export class CinemaEffects {
  getShowtimesByMovieId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CinemaActions.getShowtimesByMoieId),
      exhaustMap(({ movieId }) =>
        this.cinemaService.getShowtimesByMovieId(movieId).pipe(
          map((response: ShowtimesByMovieIdRes) => {
            console.log('Lấy thông tin lịch chiếu phim thành công!');
            return CinemaActions.getShowtimesByMoieIdSuccess({
              showtimes: response.content,
            });
          }),
          catchError(({ error }) => {
            alert(error.message);
            return of(
              CinemaActions.getShowtimesByMoieIdFailed({ error: error.message })
            );
          })
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private cinemaService: CinemaService
  ) {}
}
