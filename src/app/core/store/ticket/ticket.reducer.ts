import { createReducer, on } from '@ngrx/store';
import { DanhSachPhongVeState } from './ticket.state';
import * as TicketActions from './ticket.action';

const initialTicketByShowtimesId: DanhSachPhongVeState = {
  danhSachPhongVe: null,
  status: 'idle',
  error: null,
};

export const danhSachPhongVeReducer = createReducer(
  initialTicketByShowtimesId,
  on(
    TicketActions.layDanhSachPhongVe,
    (state): DanhSachPhongVeState => ({ ...state, status: 'loading' })
  ),
  on(
    TicketActions.layDanhSachPhongVeSuccess,
    (state, { danhSachPhongVe }): DanhSachPhongVeState => ({
      ...state,
      status: 'loaded',
      danhSachPhongVe,
    })
  ),
  on(
    TicketActions.layDanhSachPhongVeFailed,
    (state, { error }): DanhSachPhongVeState => ({
      ...state,
      status: 'error',
      error,
    })
  )
);
