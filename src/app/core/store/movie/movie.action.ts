import { createAction, props } from '@ngrx/store';
import { BannerModel, MovieByIdModel, MoviesModel } from './movie.model';

const GET_BANNER = '@Movie/GetBanner';
const GET_BANNER_SUCCESS = '@Movie/GetBannerSuccess';
const GET_BANNER_FAILED = '@Movie/GetBannerFailed';
const GET_MOVIES = '@Movie/GetMovies';
const GET_MOVIES_SUCCESS = '@Movie/GetMoviesSuccess';
const GET_MOVIES_FAILED = '@Movie/GetMoviesFailed';
const GET_MOVIES_BY_NAME = '@Movie/GetMoviesByName';
const GET_MOVIE_BY_ID = '@Movie/GetMoviesById';
const GET_MOVIE_BY_ID_SUCCESS = '@Movie/GetMoviesByIdSuccess';
const GET_MOVIE_BY_ID_FAILED = '@Movie/GetMoviesByIdFailed';
const GET_MOVIES_PAGINATION = '@Movie/GetMoviesPaginition';
const GET_MOVIES_PAGINATION_SUCCESS = '@Movie/GetMoviesPaginitionSuccess';
const GET_MOVIES_PAGINATION_FAILED = '@Movie/GetMoviesPaginitionFailed';

//------------------ GET_BANNER ----------------------
export const getBanner = createAction(GET_BANNER);
export const getBannerSuccess = createAction(
  GET_BANNER_SUCCESS,
  props<{ banner: BannerModel[] }>()
);
export const getBannerFailed = createAction(
  GET_BANNER_FAILED,
  props<{ error?: string }>()
);

//------------------ GET_MOVIES ----------------------
export const getMovies = createAction(GET_MOVIES);
export const getMoviesSuccess = createAction(
  GET_MOVIES_SUCCESS,
  props<{ movies: MoviesModel[] }>()
);
export const getMoviesFailed = createAction(
  GET_MOVIES_FAILED,
  props<{ error?: string }>()
);

//------------------ GET_MOVIE_BY_NAME ----------------------
export const getMoviesByName = createAction(
  GET_MOVIES_BY_NAME,
  props<{ tenPhim: string }>()
);

//------------------ GET_MOVIES_PAGINATION ----------------------
export const getMoviesPagination = createAction(
  GET_MOVIES_PAGINATION,
  props<{ keywords?: string }>()
);
export const getMoviesPaginationSuccess = createAction(
  GET_MOVIES_PAGINATION_SUCCESS,
  props<{ moviesPagination: MoviesModel[] }>()
);
export const getMoviesPaginationFailed = createAction(
  GET_MOVIES_PAGINATION_FAILED,
  props<{
    error?: string;
  }>()
);

//------------------ GET_MOVIE_BY_ID ----------------------
export const getMovieById = createAction(
  GET_MOVIE_BY_ID,
  props<{
    id: number;
  }>()
);
export const getMovieByIdSuccess = createAction(
  GET_MOVIE_BY_ID_SUCCESS,
  props<{ movieById: MovieByIdModel }>()
);
export const getMovieByIdFailed = createAction(
  GET_MOVIE_BY_ID_FAILED,
  props<{
    error?: string;
  }>()
);
