import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
export const DOMAIN: string = 'https://movienew.cybersoft.edu.vn/api';
export const ACCESS_TOKEN: string = 'accessToken';
export const AUTH: string = 'author';
@Injectable()
export class Interceptor implements HttpInterceptor {
  private readonly TOKEN_CYBERSOFT =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NCIsIkhldEhhblN0cmluZyI6IjA5LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMjA4MDAwMDAwMCIsIm5iZiI6MTY3MjQxOTYwMCwiZXhwIjoxNzAyMjI3NjAwfQ.P5fJSMdFWDXkAXi_Hm7kZhuXoxo6xtTzIno_q6kp38I';
  constructor(private storageService: LocalStorageService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.storageService.getObject(ACCESS_TOKEN); // Đảm bảo bạn đã lưu ACCESS_TOKEN vào localStorage

    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        TokenCybersoft: this.TOKEN_CYBERSOFT,
        'Content-Type': 'application/json',
      },
    });

    return next.handle(modifiedReq);
  }
}
