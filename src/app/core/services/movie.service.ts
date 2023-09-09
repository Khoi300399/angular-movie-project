import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOMAIN } from '../utils/interceptor.util';
import { Observable } from 'rxjs';
import {
  BannerModel,
  MovieByIdModel,
  MoviesModel,
  Response,
} from '../store/movie/movie.model';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  constructor(private http: HttpClient) {}

  getBanner(): Observable<Response<BannerModel[]>> {
    return this.http.get<Response<BannerModel[]>>(
      `${DOMAIN}/QuanLyPhim/LayDanhSachBanner`
    );
  }
  getMovies(keywords?: string): Observable<Response<MoviesModel[]>> {
    if (keywords) {
      return this.http.get<Response<MoviesModel[]>>(
        `${DOMAIN}/QuanLyPhim/LayDanhSachPhim?maNhom=GP09&tenPhim=${keywords}`
      );
    }
    return this.http.get<Response<MoviesModel[]>>(
      `${DOMAIN}/QuanLyPhim/LayDanhSachPhim?maNhom=GP09`
    );
  }
  getMovieById(id: number): Observable<Response<MovieByIdModel>> {
    return this.http.get<Response<MovieByIdModel>>(
      `${DOMAIN}/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`
    );
  }
}
