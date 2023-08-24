import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOMAIN } from '../utils/interceptor.util';
import { Observable } from 'rxjs';
import {
  BannerRes,
  MovieByIdRes,
  MoviesPginationRes,
  MoviesRes,
} from '../store/movie/movie.model';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  constructor(private http: HttpClient) {}

  getBanner(): Observable<BannerRes> {
    return this.http.get<BannerRes>(`${DOMAIN}/QuanLyPhim/LayDanhSachBanner`);
  }
  getMovies(tenPhim?: string): Observable<MoviesRes> {
    if (tenPhim !== '') {
      return this.http.get<MoviesRes>(
        `${DOMAIN}/QuanLyPhim/LayDanhSachPhim?maNhom=GP09&tenPhim=${tenPhim}`
      );
    }
    return this.http.get<MoviesRes>(
      `${DOMAIN}/QuanLyPhim/LayDanhSachPhim?maNhom=GP09`
    );
  }
  getMovieById(id: number): Observable<MovieByIdRes> {
    return this.http.get<MovieByIdRes>(
      `${DOMAIN}/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`
    );
  }
  getMoviesPagination(
    tenPhim?: string,
    soTrang: number = 1,
    soPhanTuTrenTrang: number = 8
  ): Observable<MoviesPginationRes> {
    if (tenPhim) {
      return this.http.get<MoviesPginationRes>(
        `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=1&soPhanTuTrenTrang=8`
      );
    }
    return this.http.get<MoviesPginationRes>(
      `${DOMAIN}/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP09&tenPhim=${tenPhim}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`
    );
  }
}
