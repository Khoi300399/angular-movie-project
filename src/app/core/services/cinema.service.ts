import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOMAIN } from '../utils/interceptor.util';
import {
  Response,
  ThongTinLichChieuPhimModel,
  ThongTinCumRapTheoHeThongModel,
  ThongTinLichChieuHeThongRapModel,
} from '../store/cinema/cinema.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CinemaService {
  constructor(private http: HttpClient) {}
  getThongTinLichChieuPhim(
    maPhim: number
  ): Observable<Response<ThongTinLichChieuPhimModel>> {
    return this.http.get<Response<ThongTinLichChieuPhimModel>>(
      `${DOMAIN}/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
    );
  }
  getThongTinLichChieuHeThongRap(): Observable<
    Response<ThongTinLichChieuHeThongRapModel[]>
  > {
    return this.http.get<Response<ThongTinLichChieuHeThongRapModel[]>>(
      `${DOMAIN}/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP09`
    );
  }
  getThongTinCumRapTheoHeThong(
    maHeThongRap: string
  ): Observable<Response<ThongTinCumRapTheoHeThongModel[]>> {
    return this.http.get<Response<ThongTinCumRapTheoHeThongModel[]>>(
      `${DOMAIN}/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
    );
  }
}
