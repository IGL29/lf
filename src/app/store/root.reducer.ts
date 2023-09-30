import { ActionReducerMap } from '@ngrx/store';
import { productsStore } from './products';
import { cartStore } from './cart';
import { productStore } from '../pages/product/store/product';
import { commentsStore } from '../pages/product/store/comments';
import { feedbackStore } from './feedback';
import { orderStore } from './order';
import { corporateStore } from './corporate';
import { notificationsStore } from './notifications';

export interface IRootState {
  products: productsStore.IState;
  cart: cartStore.IState;
  [productStore.FEATURE_KEY]: productStore.IState;
  [commentsStore.FEATURE_KEY]: commentsStore.IState;
  [feedbackStore.FEATURE_KEY]: feedbackStore.IState;
  [orderStore.FEATURE_KEY]: orderStore.IState;
  [corporateStore.FEATURE_KEY]: corporateStore.IState;
  [notificationsStore.FEATURE_KEY]: notificationsStore.IState;
}

export const rootReducer: ActionReducerMap<IRootState> = {
  [productsStore.FEATURE_KEY]: productsStore.productsReducer,
  [cartStore.FEATURE_KEY]: cartStore.cartReducer,
  [productStore.FEATURE_KEY]: productStore.productReducer,
  [commentsStore.FEATURE_KEY]: commentsStore.commentsReducer,
  [feedbackStore.FEATURE_KEY]: feedbackStore.feedbackReducer,
  [orderStore.FEATURE_KEY]: orderStore.orderReducer,
  [corporateStore.FEATURE_KEY]: corporateStore.corporateReducer,
  [notificationsStore.FEATURE_KEY]: notificationsStore.notificationsReducer
};
