import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  BannerState,
  MovieByIdState,
  MoviesPaginationState,
  MoviesState,
} from './movie.state';

export const featureBanner =
  createFeatureSelector<BannerState>('feature_banner');
export const featureMovies =
  createFeatureSelector<MoviesState>('feature_movies');
export const featureMoviesByName = createFeatureSelector<MoviesState>(
  'feature_moviesByName'
);
export const featureMoviesPagination =
  createFeatureSelector<MoviesPaginationState>('feature_moviesPagination');
export const featureMovieById =
  createFeatureSelector<MovieByIdState>('feature_movieById');

export const bannerSelector = createSelector(
  featureBanner,
  (state) => state.banner
);

export const moviesSelector = createSelector(
  featureMovies,
  (state) => state.movies
);
export const moviesByNameSelector = createSelector(
  featureMoviesByName,
  (state) => state.movies
);

export const movieByIdSelector = createSelector(
  featureMovieById,
  (state) => state.movieById
);
export const movieByIdStatusSelector = createSelector(
  featureMovieById,
  (state) => state.status
);
export const moviesPaginationSelector = createSelector(
  featureMoviesPagination,
  (state) => state.moviesPagination
);
export const moviesPaginationStatusSelector = createSelector(
  featureMoviesPagination,
  (state) => state.status
);
