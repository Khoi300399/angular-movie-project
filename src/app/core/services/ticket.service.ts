import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  DanhSachPhongVeModel,
  DatVeModel,
  Response,
} from '../store/ticket/ticket.model';
import { Observable } from 'rxjs';
import { DOMAIN } from '../utils/interceptor.util';

@Injectable({ providedIn: 'root' })
export class TicketService {
  getDanhSachPhongVe(
    maLichChieu: number
  ): Observable<Response<DanhSachPhongVeModel>> {
    return this.http.get<Response<DanhSachPhongVeModel>>(
      `${DOMAIN}/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
  }
  postDatVe(datVeData: DatVeModel) {
    return this.http.post<Response<string>>(
      `${DOMAIN}/QuanLyDatVe/DatVe`,
      datVeData
    );
  }
  constructor(private http: HttpClient) {}
}
