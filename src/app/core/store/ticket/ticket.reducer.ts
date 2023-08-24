import { createReducer, on } from '@ngrx/store';
import { TicketByShowtimesIdState } from './ticket.state';
import * as TicketActions from './ticket.action';

const initialTicketByShowtimesId: TicketByShowtimesIdState = {
  ticket: null,
  status: 'idle',
  error: null,
};

export const ticketByShowtimesIdReducer = createReducer(
  initialTicketByShowtimesId,
  on(
    TicketActions.getTicketByShowtimesId,
    (state): TicketByShowtimesIdState => ({ ...state, status: 'loading' })
  ),
  on(
    TicketActions.getTicketByShowtimesIdSuccess,
    (state, { ticket }): TicketByShowtimesIdState => ({
      ...state,
      status: 'loaded',
      ticket,
    })
  ),
  on(
    TicketActions.getTicketByShowtimesIdFailed,
    (state, { error }): TicketByShowtimesIdState => ({
      ...state,
      status: 'error',
      error,
    })
  )
);
