import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOMAIN } from '../utils/interceptor.util';
import { ShowtimesByMovieIdRes } from '../store/cinema/cinema.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CinemaService {
  constructor(private http: HttpClient) {}
  getShowtimesByMovieId(id: number): Observable<ShowtimesByMovieIdRes> {
    return this.http.get<ShowtimesByMovieIdRes>(
      `${DOMAIN}/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`
    );
  }
}
