import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store/app.state';
import { getMoviesByName } from '../../core/store/movie/movie.action';
import { MoviesModel } from '../../core/store/movie/movie.model';
import { moviesSelector } from '../../core/store/movie/movie.selector';
import { Observable, distinct, map, of } from 'rxjs';

import { layThongTinLichChieuPhim } from '../../core/store/cinema/cinema.actions';
import { lichChieuPhimSelector } from '../../core/store/cinema/cinema.selector';
import {
  CumRapChieu,
  HeThongRapChieu,
  LichChieuPhim,
  ThongTinLichChieuPhimModel,
} from '../../core/store/cinema/cinema.model';

@Component({
  selector: 'booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  selectedMovie: string = '';
  selectedCinema: string = '';
  selectedDate: string = '';
  selectedTime: string = '';
  maLichChieu!: string;
  movies$!: Observable<MoviesModel[]>;
  thongTinLichChieuPhim$!: Observable<ThongTinLichChieuPhimModel | null>;
  cumRapRender$: Observable<CumRapChieu[]> = of([]);
  lichChieuPhimData$: Observable<LichChieuPhim[]> = of([]);
  lichChieuSelected: LichChieuPhim[] = [];
  ngayChieuRender$: Observable<string[]> = of([]);
  suatChieuRender$: Observable<string[]> = of([]);

  ngOnInit(): void {
    this.store.dispatch(getMoviesByName({ tenPhim: '' }));
    this.movies$ = this.store.select(moviesSelector);
    this.thongTinLichChieuPhim$ = this.store.select(lichChieuPhimSelector);
  }
  getCumRapRender(
    showtimes$: Observable<ThongTinLichChieuPhimModel | null>
  ): Observable<CumRapChieu[]> {
    return showtimes$.pipe(
      map((data) => {
        return (
          data?.heThongRapChieu?.reduce(
            (accumulator: CumRapChieu[], heThongRap: HeThongRapChieu) => {
              return [...accumulator, ...heThongRap.cumRapChieu];
            },
            []
          ) || []
        );
      })
    );
  }
  getNgayChieuRender(
    selectedCinema: string,
    cumRapData$: Observable<CumRapChieu[]>
  ): Observable<string[]> {
    return cumRapData$.pipe(
      map((cumRap) => {
        const selectedCumRap = cumRap.find(
          (rap) => rap.tenCumRap === selectedCinema
        );
        if (!selectedCumRap) {
          return [];
        }
        const ngayChieuList: string[] =
          selectedCumRap.lichChieuPhim?.map((lichChieu) =>
            lichChieu.ngayChieuGioChieu.slice(0, 10)
          ) || [];
        this.lichChieuPhimData$ = of(selectedCumRap?.lichChieuPhim);
        return ngayChieuList;
      }),
      distinct()
    );
  }
  getSuatChieuRender(
    selectedDay: string,
    lichChieuPhim$: Observable<LichChieuPhim[]>
  ): Observable<string[]> {
    return lichChieuPhim$.pipe(
      map((lichChieu) => {
        const selectedLichChieu: LichChieuPhim[] = lichChieu.filter(
          (lich) => lich.ngayChieuGioChieu.slice(0, 10) === selectedDay
        );
        if (!selectedLichChieu) {
          return [];
        }

        const suatChieuList: string[] = selectedLichChieu?.map((lich) =>
          lich.ngayChieuGioChieu.slice(11, 16)
        );
        this.lichChieuSelected = selectedLichChieu;
        return suatChieuList;
      })
    );
  }
  getMaLichChieu(
    selectedTime: string,
    lichChieuSelected: LichChieuPhim[]
  ): string {
    return (
      lichChieuSelected?.find(
        (lich) => lich.ngayChieuGioChieu.slice(11, 16) === selectedTime
      )?.maLichChieu || ''
    );
  }
  onMovieOptioneClick({
    data,
    selectedValue,
  }: {
    data: MoviesModel;
    selectedValue: string;
  }) {
    this.selectedDate = '';
    this.selectedTime = '';
    this.selectedCinema = '';
    this.maLichChieu = '';
    if (this.selectedMovie !== selectedValue) {
      this.selectedMovie = selectedValue;
      this.store.dispatch(layThongTinLichChieuPhim({ maPhim: data.maPhim }));
      this.cumRapRender$ = this.getCumRapRender(this.thongTinLichChieuPhim$);
    } else {
      this.selectedMovie = '';
      this.cumRapRender$ = of([]);
      this.ngayChieuRender$ = of([]);
      this.suatChieuRender$ = of([]);
    }
  }
  onCinemaOptioneClick({
    data,
    selectedValue,
  }: {
    data: CumRapChieu;
    selectedValue: string;
  }) {
    this.selectedDate = '';
    this.selectedTime = '';
    this.maLichChieu = '';
    if (this.selectedCinema !== selectedValue) {
      this.selectedCinema = selectedValue;
      this.ngayChieuRender$ = this.getNgayChieuRender(
        selectedValue,
        this.cumRapRender$
      );
    } else {
      this.selectedCinema = '';
      this.ngayChieuRender$ = of([]);
      this.suatChieuRender$ = of([]);
    }
  }
  onDayOptioneClick({
    data,
    selectedValue,
  }: {
    data: string;
    selectedValue: string;
  }) {
    this.selectedTime = '';
    this.maLichChieu = '';
    if (this.selectedDate !== selectedValue) {
      this.selectedDate = selectedValue;
      this.suatChieuRender$ = this.getSuatChieuRender(
        selectedValue,
        this.lichChieuPhimData$
      );
    } else {
      this.selectedDate = '';
      this.suatChieuRender$ = of([]);
    }
  }
  onTimeOptioneClick({
    data,
    selectedValue,
  }: {
    data: string;
    selectedValue: string;
  }) {
    this.maLichChieu = '';
    if (this.selectedTime !== selectedValue) {
      this.selectedTime = selectedValue;
      this.maLichChieu = this.getMaLichChieu(
        selectedValue,
        this.lichChieuSelected
      );
    } else {
      this.selectedTime = '';
    }
  }

  constructor(private store: Store<AppState>) {}
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
}
