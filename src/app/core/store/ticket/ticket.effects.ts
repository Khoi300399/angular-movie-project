import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TicketActions from './ticket.action';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { TicketService } from '../../services/ticket.service';
import { DanhSachPhongVeModel, Response } from './ticket.model';

@Injectable()
export class TicketEffects {
  layDanhSachPhongVe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.layDanhSachPhongVe),
      exhaustMap(({ maLichChieu }) =>
        this.ticketService.getDanhSachPhongVe(maLichChieu).pipe(
          map((response: Response<DanhSachPhongVeModel>) => {
            return TicketActions.layDanhSachPhongVeSuccess({
              danhSachPhongVe: response.content,
            });
          }),
          catchError(({ error }: { error: Response<string> }) => {
            alert(error.content);
            return of(
              TicketActions.layDanhSachPhongVeFailed({
                error: error.content,
              })
            );
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private ticketService: TicketService
  ) {}
}
