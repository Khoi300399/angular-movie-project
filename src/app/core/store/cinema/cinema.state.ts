import {
  ThongTinLichChieuPhimModel,
  ThongTinCumRapTheoHeThongModel,
  ThongTinLichChieuHeThongRapModel,
} from './cinema.model';

export interface ThongTinLichChieuPhimState {
  lichChieuPhim: ThongTinLichChieuPhimModel | null;
  status: 'idle' | 'loading' | 'loaded' | 'error';
  error: string | null;
}
export interface ThongTinLichChieuHeThongRapState {
  thongTinLichChieu: ThongTinLichChieuHeThongRapModel[];
  status: 'idle' | 'loading' | 'loaded' | 'error';
  error: string | null;
}
export interface ThongTinCumRapTheoHeThongState {
  thongTinCumRap: ThongTinCumRapTheoHeThongModel[];
  status: 'idle' | 'loading' | 'loaded' | 'error';
  error: string | null;
}
