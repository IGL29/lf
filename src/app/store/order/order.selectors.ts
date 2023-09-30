import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FEATURE_KEY, IState } from './order.reducer';
import { IRootState } from '../root.reducer';

export const orderSelector = createFeatureSelector<IState>(FEATURE_KEY);

export const orderLoadingSelector = createSelector<IRootState, IState, boolean>(
  orderSelector,
  (state: IState) => state.isLoading
);
