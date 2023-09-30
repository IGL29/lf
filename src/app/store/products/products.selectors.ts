import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IState } from './products.reducer';
import { IRootState } from '../root.reducer';

export const productsSelector = createFeatureSelector<IState>('products');

export const productsIsHydrateSelector = createSelector<
  IRootState,
  IState,
  IState['isHydrateSuccess']
>(productsSelector, (state: IState) => state.isHydrateSuccess);

export const productsAllSelector = createSelector<IRootState, IState, IState['products']>(
  productsSelector,
  (state: IState) => state.products
);

export const productsLoadingSelector = createSelector<IRootState, IState, IState['isLoading']>(
  productsSelector,
  (state: IState) => state.isLoading
);

export const productsErrorSelector = createSelector<IRootState, IState, IState['error']>(
  productsSelector,
  (state: IState) => state.error
);
