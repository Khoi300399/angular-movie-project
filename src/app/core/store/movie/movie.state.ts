import { BannerModel, MovieByIdModel, MoviesModel } from './movie.model';

export interface BannerState {
  banner: BannerModel[];
  status: 'idle' | 'loading' | 'loaded' | 'error';
  error?: string | null;
}
export interface MoviesState {
  movies: MoviesModel[];
  status: 'idle' | 'loading' | 'loaded' | 'error';
  error?: string | null;
}
export interface MovieByIdState {
  movieById: MovieByIdModel | null;
  status: 'idle' | 'loading' | 'loaded' | 'error';
  error?: string | null;
}
export interface MoviesPaginationState {
  moviesPagination: MoviesModel[];
  status: 'idle' | 'loading' | 'loaded' | 'error';
  error?: string | null;
}
