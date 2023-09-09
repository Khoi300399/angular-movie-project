import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ThongTinTaiKhoanModel,
  Auth,
  Credentials,
  RegisterModel,
  Response,
} from '../store/auth/auth.model';
import { DOMAIN } from '../utils/interceptor.util';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: Credentials): Observable<Response<Auth>> {
    return this.http.post<Response<Auth>>(
      `${DOMAIN}/QuanLyNguoiDung/DangNhap`,
      credentials
    );
  }
  register(user: RegisterModel): Observable<Response<Auth>> {
    return this.http.post<Response<Auth>>(
      `${DOMAIN}/QuanLyNguoiDung/DangKy`,
      user
    );
  }
  layThongTinTaiKhoan(): Observable<Response<ThongTinTaiKhoanModel>> {
    return this.http.post<Response<ThongTinTaiKhoanModel>>(
      `${DOMAIN}/QuanLyNguoiDung/ThongTinTaiKhoan`,
      {}
    );
  }
  capNhatThongTinTaiKhoan(
    data: ThongTinTaiKhoanModel
  ): Observable<Response<ThongTinTaiKhoanModel>> {
    return this.http.put<Response<ThongTinTaiKhoanModel>>(
      `${DOMAIN}/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      data
    );
  }
}
