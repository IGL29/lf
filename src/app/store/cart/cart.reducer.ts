import { createReducer, on } from '@ngrx/store';
import {
  deleteProductAction,
  deleteProductErrorAction,
  deleteProductSuccessAction,
  postChangeCountAction,
  postChangeCountErrorAction,
  postChangeCountSuccessAction,
  postProductAction,
  postProductErrorAction,
  postProductSuccessAction,
  requestAction,
  requestErrorAction,
  requestSuccessAction
} from './cart.actions';
import { ErrorPayload } from '~types/apiPayloads';
import { Cart } from 'src/app/services/cart-storage/cart-storage.service';

export interface IState {
  inCart: Cart | null;
  isLoading: TIsCartLoading;
  isPostLoading: TIsCartLoading;
  error: ErrorPayload['error'] | null;
  postError: ErrorPayload['error'] | null;
}

export type TCount = number;
export type TIsCartLoading = boolean;

export const initialState: IState = {
  inCart: [],
  isLoading: false,
  isPostLoading: false,
  error: null,
  postError: null
};

export const FEATURE_KEY = 'cart';

export const cartReducer = createReducer<IState>(
  initialState,
  on(requestAction, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(requestSuccessAction, (state, payload) => ({
    ...state,
    inCart: payload.inCart,
    isLoading: false
  })),
  on(requestErrorAction, (state, payload) => ({
    ...state,
    isLoading: false,
    error: payload.error
  })),
  on(postProductAction, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(postProductSuccessAction, (state, payload) => ({
    ...state,
    inCart: payload.inCart,
    isLoading: false
  })),
  on(postProductErrorAction, (state, payload) => ({
    ...state,
    isLoading: false,
    postError: payload.error
  })),
  on(postChangeCountAction, (state) => ({
    ...state,
    isLoading: true,
    postError: null
  })),
  on(postChangeCountSuccessAction, (state, payload) => ({
    ...state,
    inCart: payload.inCart,
    isLoading: false
  })),
  on(postChangeCountErrorAction, (state, payload) => ({
    ...state,
    isLoading: false,
    error: payload.error
  })),
  on(deleteProductAction, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(deleteProductSuccessAction, (state, payload) => ({
    ...state,
    inCart: payload.inCart,
    isLoading: false
  })),
  on(deleteProductErrorAction, (state, payload) => ({
    ...state,
    isLoading: false,
    error: payload.error
  }))
);
