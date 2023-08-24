import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TicketByShowtimesIdState } from './ticket.state';

const featureTicketByShowtimesId =
  createFeatureSelector<TicketByShowtimesIdState>(
    'feature_ticketByShowtimesId'
  );

export const ticketByShowtimesIdSelector = createSelector(
  featureTicketByShowtimesId,
  (state) => state.ticket
);
