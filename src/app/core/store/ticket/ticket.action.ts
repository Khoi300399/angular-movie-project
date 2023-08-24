import { createAction, props } from '@ngrx/store';
import { TicketByShowtimesIdModel } from './ticket.model';

const GET_TICKET_BY_SHOWTIMES_ID = '@Ticket/GetTicketByShowtimesId';
const GET_TICKET_BY_SHOWTIMES_ID_SUCCESS =
  '@Ticket/GetTicketByShowtimesIdSuccess';
const GET_TICKET_BY_SHOWTIMES_ID_FAILED =
  '@Ticket/GetTicketByShowtimesIdFailed';

export const getTicketByShowtimesId = createAction(
  GET_TICKET_BY_SHOWTIMES_ID,
  props<{ showtimesId: number }>()
);
export const getTicketByShowtimesIdSuccess = createAction(
  GET_TICKET_BY_SHOWTIMES_ID_SUCCESS,
  props<{ ticket: TicketByShowtimesIdModel }>()
);
export const getTicketByShowtimesIdFailed = createAction(
  GET_TICKET_BY_SHOWTIMES_ID_FAILED,
  props<{ error?: string }>()
);
