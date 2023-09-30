import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IState } from './cart.reducer';
import { IRootState } from '../root.reducer';

export const cartSelector = createFeatureSelector<IState>('cart');

export const inCartSelector = createSelector<IRootState, IState, IState['inCart']>(
  cartSelector,
  (state: IState) => state.inCart
);

export const countInCartSelector = createSelector<IRootState, IState, IState['inCart'], number>(
  cartSelector,
  inCartSelector,
  (_, inCart: IState['inCart']) =>
    inCart ? inCart.reduce((accum, productInCart) => productInCart.count + accum, 0) : 0
);

export const cartPriceSelector = createSelector<IRootState, IState, IState['inCart'], number>(
  cartSelector,
  inCartSelector,
  (_, inCart: IState['inCart']) => {
    return inCart
      ? inCart.reduce(
          (accum, productInCart) =>
            productInCart.count *
              (productInCart.product.price.value - productInCart.product.price.discount) +
            accum,
          0
        )
      : 0;
  }
);
export const cartDiscountSelector = createSelector<IRootState, IState, IState['inCart'], number>(
  cartSelector,
  inCartSelector,
  (_, inCart: IState['inCart']) => {
    return inCart
      ? inCart.reduce(
          (accum, productInCart) =>
            productInCart.count * productInCart.product.price.discount + accum,
          0
        )
      : 0;
  }
);

export const cartLoadingSelector = createSelector<IRootState, IState, IState['isLoading']>(
  cartSelector,
  (state: IState) => state.isLoading
);

export const cartErrorSelector = createSelector<IRootState, IState, IState['error']>(
  cartSelector,
  (state: IState) => state.error
);

export const cartPostLoadingSelector = createSelector<IRootState, IState, IState['isPostLoading']>(
  cartSelector,
  (state: IState) => state.isLoading
);

export const cartPostingErrorSelector = createSelector<IRootState, IState, IState['postError']>(
  cartSelector,
  (state: IState) => state.error
);
