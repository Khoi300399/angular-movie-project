import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TicketActions from './ticket.action';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { TicketService } from '../../services/ticket.service';
import { TicketByShowtimesIdRes } from './ticket.model';

@Injectable()
export class TicketEffects {
  getTicketByshowtimesId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.getTicketByShowtimesId),
      exhaustMap(({ showtimesId }) =>
        this.ticketService.getTicketByShowtimesId(showtimesId).pipe(
          map((response: TicketByShowtimesIdRes) => {
            console.log('Lấy danh sách phòng vé thành công');
            return TicketActions.getTicketByShowtimesIdSuccess({
              ticket: response.content,
            });
          }),
          catchError(({ error }) => {
            alert(error.message);
            return of(
              TicketActions.getTicketByShowtimesIdFailed({
                error: error.message,
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
