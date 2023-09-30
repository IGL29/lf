import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IRootState } from 'src/app/store/root.reducer';
import { IState } from './comments.reducer';

export const commentsStoreSelector = createFeatureSelector<IState>('comments');

export const commentsSelector = createSelector<IRootState, IState, IState['comments']>(
  commentsStoreSelector,
  (store: IState) => store.comments
);

export const commentsLoadingSelector = createSelector<IRootState, IState, IState['isLoading']>(
  commentsStoreSelector,
  (store: IState) => store.isLoading
);

export const commentsErrorSelector = createSelector<IRootState, IState, IState['error']>(
  commentsStoreSelector,
  (store: IState) => store.error
);

export const commentLoadingSelector = createSelector<IRootState, IState, IState['postIsLoading']>(
  commentsStoreSelector,
  (store: IState) => store.postIsLoading
);

export const commentErrorSelector = createSelector<IRootState, IState, IState['postError']>(
  commentsStoreSelector,
  (store: IState) => store.postError
);
