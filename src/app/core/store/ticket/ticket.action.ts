import { createAction, props } from '@ngrx/store';
import { DanhSachPhongVeModel } from './ticket.model';

const LAY_DANHSACH_PHONGVE = '@Ticket/GetTicketByShowtimesId';
const LAY_DANHSACH_PHONGVE_SUCCESS = '@Ticket/GetTicketByShowtimesIdSuccess';
const LAY_DANHSACH_PHONGVE_FAILED = '@Ticket/GetTicketByShowtimesIdFailed';

export const layDanhSachPhongVe = createAction(
  LAY_DANHSACH_PHONGVE,
  props<{ maLichChieu: number }>()
);
export const layDanhSachPhongVeSuccess = createAction(
  LAY_DANHSACH_PHONGVE_SUCCESS,
  props<{ danhSachPhongVe: DanhSachPhongVeModel }>()
);
export const layDanhSachPhongVeFailed = createAction(
  LAY_DANHSACH_PHONGVE_FAILED,
  props<{ error?: string }>()
);
