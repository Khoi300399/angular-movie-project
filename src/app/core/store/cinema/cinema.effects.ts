import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CinemaActions from './cinema.actions';
import { catchError, exhaustMap, map, of, pipe, tap } from 'rxjs';
import { CinemaService } from '../../services/cinema.service';
import {
  Response,
  ThongTinCumRapTheoHeThongModel,
  ThongTinLichChieuHeThongRapModel,
  ThongTinLichChieuPhimModel,
} from './cinema.model';

@Injectable()
export class CinemaEffects {
  layThongTinLichChieuPhim$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CinemaActions.layThongTinLichChieuPhim),
      exhaustMap(({ maPhim }) =>
        this.cinemaService.getThongTinLichChieuPhim(maPhim).pipe(
          map((response: Response<ThongTinLichChieuPhimModel>) => {
            return CinemaActions.layThongTinLichChieuPhimSuccess({
              lichChieuPhim: response.content,
            });
          }),
          catchError(({ error }: { error: Response<string> }) => {
            alert(error.content);
            return of(
              CinemaActions.layThongTinLichChieuPhimFailed({
                error: error.content,
              })
            );
          })
        )
      )
    )
  );

  layThongTinLichChieuHeThongRap$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CinemaActions.layThongTinLichChieuHeThongRap),
      exhaustMap(() =>
        this.cinemaService.getThongTinLichChieuHeThongRap().pipe(
          map((response: Response<ThongTinLichChieuHeThongRapModel[]>) => {
            return CinemaActions.layThongTinLichChieuHeThongRapSuccess({
              thongTinLichChieu: response.content,
            });
          }),
          catchError(({ error }: { error: Response<string> }) => {
            alert(error.content);
            return of(
              CinemaActions.layThongTinLichChieuHeThongRapFailed({
                error: error.content,
              })
            );
          })
        )
      )
    )
  );

  layThongTinCumRapTheoHeThong$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CinemaActions.layThongTinCumRapTheoHeThong),
      exhaustMap(({ maHeThongRap }) =>
        this.cinemaService.getThongTinCumRapTheoHeThong(maHeThongRap).pipe(
          map((response: Response<ThongTinCumRapTheoHeThongModel[]>) => {
            return CinemaActions.layThongTinCumRapTheoHeThongSuccess({
              thongTinCumRap: response.content,
            });
          }),
          catchError(({ error }: { error: Response<string> }) => {
            alert(error.content);
            return of(
              CinemaActions.layThongTinCumRapTheoHeThongFailed({
                error: error.content,
              })
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
