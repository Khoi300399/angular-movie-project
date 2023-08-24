import { ShowtimesByMovieIdModel } from './cinema.model';

export interface ShowtimesByMovieIdState {
  showtimes: ShowtimesByMovieIdModel | null;
  status: 'idle' | 'loading' | 'loaded' | 'error';
  error: string | null;
}
