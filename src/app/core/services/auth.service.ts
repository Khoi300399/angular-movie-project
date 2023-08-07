import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRes, Credentials } from '../store/auth/auth.model';
import { DOMAIN } from '../utils/interceptor.util';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: Credentials): Observable<AuthRes> {
    return this.http.post<AuthRes>(
      `${DOMAIN}/QuanLyNguoiDung/DangNhap`,
      credentials
    );
  }
}
