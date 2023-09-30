import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IState } from './corporate.reducer';
import { IRootState } from '../root.reducer';

export const requestSelector = createFeatureSelector<IState>('corporate');

export const requestLoadingSelector = createSelector<IRootState, IState, boolean>(
  requestSelector,
  (state: IState) => state.isLoading
);
