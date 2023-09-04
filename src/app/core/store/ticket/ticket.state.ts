import { DanhSachPhongVeModel } from './ticket.model';

export interface DanhSachPhongVeState {
  danhSachPhongVe: DanhSachPhongVeModel | null;
  status: 'idle' | 'loading' | 'loaded' | 'error';
  error?: string | null;
}
