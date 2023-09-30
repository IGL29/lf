import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IState } from './product.reducer';
import { IRootState } from 'src/app/store/root.reducer';

export const productStoreSelector = createFeatureSelector<IState>('product');

export const productIsHydrateSelector = createSelector<
  IRootState,
  IState,
  IState['isHydrateSuccess']
>(productStoreSelector, (store: IState) => store.isHydrateSuccess);

export const productSelector = createSelector<IRootState, IState, IState['product']>(
  productStoreSelector,
  (store: IState) => store.product
);

export const productLoadingSelector = createSelector<IRootState, IState, IState['isLoading']>(
  productStoreSelector,
  (store: IState) => store.isLoading
);

export const productErrorSelector = createSelector<IRootState, IState, IState['error']>(
  productStoreSelector,
  (store: IState) => store.error
);
