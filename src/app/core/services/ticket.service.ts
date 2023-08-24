import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TicketByShowtimesIdRes } from '../store/ticket/ticket.model';
import { Observable } from 'rxjs';
import { DOMAIN } from '../utils/interceptor.util';

@Injectable({ providedIn: 'root' })
export class TicketService {
  getTicketByShowtimesId(id: number): Observable<TicketByShowtimesIdRes> {
    return this.http.get<TicketByShowtimesIdRes>(
      `${DOMAIN}/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`
    );
  }
  constructor(private http: HttpClient) {}
}
