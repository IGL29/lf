import { createReducer, on } from '@ngrx/store';
import {
  hydrateSuccessAction,
  requestAction,
  requestCancelAction,
  requestErrorAction,
  requestSuccessAction
} from './products.actions';
import { IProduct } from '~types/product';
import { ErrorPayload } from '~types/apiPayloads';
import { makeStateKey } from '@angular/platform-browser';

export type TIsLoading = boolean;

export interface IState {
  products: IProduct[];
  isLoading: TIsLoading;
  error: ErrorPayload['error'] | null;
  isHydrateSuccess: boolean;
}

export const initialState: IState = {
  products: [],
  isLoading: false,
  error: null,
  isHydrateSuccess: false
};

export const FEATURE_KEY = 'products';
export const PRODUCTS_STORE_TRANSFER_KEY = makeStateKey<IState>('productsStoreTransferKey');

export const productsReducer = createReducer<IState>(
  initialState,
  on(hydrateSuccessAction, (state, action) => ({
    ...state,
    ...action.payload,
    isHydrateSuccess: true
  })),
  on(requestAction, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(requestSuccessAction, (state, payload) => ({
    ...state,
    isLoading: false,
    products: payload.products
  })),
  on(requestErrorAction, (state, payload) => ({
    ...state,
    isLoading: false,
    error: payload.error
  })),
  on(requestCancelAction, (state) => ({
    ...state,
    isLoading: false,
    isHydrateSuccess: false
  }))
);
