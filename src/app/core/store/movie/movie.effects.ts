import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as MoviesActions from './movie.action';
import {
  catchError,
  debounceTime,
  exhaustMap,
  forkJoin,
  map,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { MoviesService } from '../../services/movie.service';
import {
  BannerRes,
  MovieByIdRes,
  MoviesPginationRes,
  MoviesRes,
} from './movie.model';

@Injectable()
export class MoviesEffects {
  getBanner$ = createEffect(() =>
    this.action$.pipe(
      ofType(MoviesActions.getBanner),
      exhaustMap(() =>
        this.moviesService.getBanner().pipe(
          switchMap((response: BannerRes) => {
            const bannerObservables = response.content.map((banner) =>
              this.moviesService.getMovieById(banner.maPhim).pipe(
                map((res: MovieByIdRes) => ({
                  ...banner,
                  trailer: res.content.trailer,
                }))
              )
            );

            return forkJoin(bannerObservables).pipe(
              map((banners) => {
                console.log('Lấy banner thành công!');
                return MoviesActions.getBannerSuccess({ banner: banners });
              }),
              catchError(({ error }) => {
                alert(error.content);
                return of(
                  MoviesActions.getBannerFailed({ error: error.content })
                );
              })
            );
          })
        )
      )
    )
  );

  getMovieById$ = createEffect(() =>
    this.action$.pipe(
      ofType(MoviesActions.getMovieById),
      exhaustMap(({ id }) =>
        this.moviesService.getMovieById(id).pipe(
          map((response: MovieByIdRes) => {
            console.log('Lấy thông tin phim thành công!', response.content);
            return MoviesActions.getMovieByIdSuccess({
              movieById: response.content,
            });
          }),
          catchError(({ error }) => {
            alert(error.content);
            return of(
              MoviesActions.getMovieByIdFailed({ error: error.content })
            );
          })
        )
      )
    )
  );
  getMovies$ = createEffect(() =>
    this.action$.pipe(
      ofType(MoviesActions.getMovies),
      exhaustMap(() =>
        this.moviesService.getMovies('').pipe(
          map((response: MoviesRes) => {
            console.log('Lấy danh sách phim thành công!');
            return MoviesActions.getMoviesSuccess({
              movies: response.content,
            });
          }),
          catchError(({ error }) => {
            alert(error.content);
            return of(MoviesActions.getMoviesFailed({ error: error.content }));
          })
        )
      )
    )
  );
  getMoviesByName$ = createEffect(() =>
    this.action$.pipe(
      ofType(MoviesActions.getMoviesByName),
      debounceTime(300),
      switchMap(({ tenPhim }) =>
        this.moviesService.getMovies(tenPhim).pipe(
          map((response: MoviesRes) => {
            console.log('Lấy danh sách phim thành công!');
            return MoviesActions.getMoviesSuccess({
              movies: response.content,
            });
          }),
          catchError(({ error }) => {
            alert(error.content);
            return of(MoviesActions.getMoviesFailed({ error: error.content }));
          })
        )
      )
    )
  );
  getMoviesPagination$ = createEffect(() =>
    this.action$.pipe(
      ofType(MoviesActions.getMoviesPagination),
      exhaustMap(({ tenPhim, soTrang, soPhanTuTrenTrang }) =>
        this.moviesService
          .getMoviesPagination(tenPhim, soTrang, soPhanTuTrenTrang)
          .pipe(
            map((response: MoviesPginationRes) => {
              console.log('Lấy danh sách phim phân trang thành công!');
              return MoviesActions.getMoviesPaginationSuccess({
                moviesPagination: response.items,
              });
            }),
            catchError((error) => {
              return of(
                MoviesActions.getMoviesPaginationFailed({
                  error: error.message,
                })
              );
            })
          )
      )
    )
  );
  constructor(
    private readonly action$: Actions,
    private moviesService: MoviesService
  ) {}
}
