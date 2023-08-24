import { TicketByShowtimesIdModel } from './ticket.model';

export interface TicketByShowtimesIdState {
  ticket: TicketByShowtimesIdModel | null;
  status: 'idle' | 'loading' | 'loaded' | 'error';
  error?: string | null;
}
