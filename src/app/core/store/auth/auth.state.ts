import { Auth } from './auth.model';

export interface AuthState {
  auth?: Auth | null;
  status: 'idle' | 'loading' | 'loaded' | 'error';
  error?: number | null;
}
