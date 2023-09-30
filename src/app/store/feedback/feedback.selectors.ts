import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IState } from './feedback.reducer';
import { IRootState } from '../root.reducer';

export const feedbackSelector = createFeatureSelector<IState>('feedback');

export const feedbackLoadingSelector = createSelector<IRootState, IState, boolean>(
  feedbackSelector,
  (state: IState) => state.isLoading
);
