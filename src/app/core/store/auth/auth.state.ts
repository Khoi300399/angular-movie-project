import { Auth, ThongTinTaiKhoanModel } from './auth.model';

export interface AuthState {
  auth?: Auth | null;
  status: 'idle' | 'loading' | 'loaded' | 'error';
  error?: string | null;
}
export interface RegisterState {
  status: 'idle' | 'loading' | 'loaded' | 'error';
  error?: string | null;
}
export interface ThongTinTaiKhoanState {
  thongTinTaiKhoan: ThongTinTaiKhoanModel | null;
  status: 'idle' | 'loading' | 'loaded' | 'error';
  error?: string | null;
}
