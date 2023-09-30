import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FEATURE_KEY, IState } from './notifications.reducer';
import { IRootState } from '../root.reducer';

export const notificationsSelector = createFeatureSelector<IState>(FEATURE_KEY);

export const notificationsListSelector = createSelector<IRootState, IState, IState['list']>(
  notificationsSelector,
  (state: IState) => state.list
);
