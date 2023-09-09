import { createReducer, on } from '@ngrx/store';
import {
  BannerState,
  MovieByIdState,
  MoviesPaginationState,
  MoviesState,
} from './movie.state';
import * as MoviesActions from './movie.action';

const initialBannerState: BannerState = {
  banner: [],
  status: 'idle',
  error: null,
};
const initialMoviesState: MoviesState = {
  movies: [],
  status: 'idle',
  error: null,
};
const initialMoviesPaginationState: MoviesState = {
  movies: [],
  status: 'idle',
  error: null,
};
const initialMoviesByNameState: MoviesState = {
  movies: [],
  status: 'idle',
  error: null,
};
const initialMovieByIdState: MovieByIdState = {
  movieById: null,
  status: 'idle',
  error: null,
};

export const bannerReducer = createReducer(
  initialBannerState,
  on(
    MoviesActions.getBanner,
    (state): BannerState => ({ ...state, status: 'loading' })
  ),
  on(
    MoviesActions.getBannerSuccess,
    (state, action): BannerState => ({
      ...state,
      banner: action.banner,
      status: 'loaded',
    })
  ),
  on(
    MoviesActions.getBannerFailed,
    (state): BannerState => ({ ...state, status: 'error' })
  )
);
export const moviesReducer = createReducer(
  initialMoviesState,
  on(
    MoviesActions.getMovies,
    (state): MoviesState => ({ ...state, status: 'loading' })
  ),
  on(
    MoviesActions.getMoviesSuccess,
    (state, action): MoviesState => ({
      ...state,
      movies: action.movies,
      status: 'loaded',
    })
  ),
  on(
    MoviesActions.getMoviesFailed,
    (state): MoviesState => ({ ...state, status: 'error' })
  )
);
export const moviesByNameReducer = createReducer(
  initialMoviesByNameState,
  on(
    MoviesActions.getMoviesByName,
    (state): MoviesState => ({ ...state, status: 'loading' })
  ),
  on(
    MoviesActions.getMoviesSuccess,
    (state, action): MoviesState => ({
      ...state,
      movies: action.movies,
      status: 'loaded',
    })
  ),
  on(
    MoviesActions.getMoviesFailed,
    (state): MoviesState => ({ ...state, status: 'error' })
  )
);

export const movieByIdReducer = createReducer(
  initialMovieByIdState,
  on(
    MoviesActions.getMovieById,
    (state): MovieByIdState => ({ ...state, status: 'loading' })
  ),
  on(
    MoviesActions.getMovieByIdSuccess,
    (state, action): MovieByIdState => ({
      ...state,
      movieById: action.movieById,
      status: 'loaded',
    })
  ),
  on(
    MoviesActions.getMovieByIdFailed,
    (state): MovieByIdState => ({ ...state, status: 'error' })
  )
);

export const moviePaginationReducer = createReducer(
  initialMoviesPaginationState,
  on(
    MoviesActions.getMoviesPagination,
    (state): MoviesState => ({ ...state, status: 'loading' })
  ),
  on(
    MoviesActions.getMoviesPaginationSuccess,
    (state, action): MoviesState => ({
      ...state,
      movies: action.moviesPagination,
      status: 'loaded',
    })
  ),
  on(
    MoviesActions.getMoviesPaginationFailed,
    (state): MoviesState => ({ ...state, status: 'error' })
  )
);
