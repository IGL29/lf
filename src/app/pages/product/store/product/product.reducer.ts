import { createReducer, on } from '@ngrx/store';
import {
  hydrateErrorAction,
  hydrateSuccessAction,
  requestAction,
  requestCancelAction,
  requestErrorAction,
  requestSuccessAction
} from './product.actions';
import { IProduct } from '~types/product';
import { ErrorPayload } from '~types/apiPayloads';
import { makeStateKey } from '@angular/platform-browser';

export interface IState {
  product: IProduct | null;
  isLoading: boolean;
  error: ErrorPayload['error'] | null;
  isHydrateSuccess: boolean;
}

export const initialState: IState = {
  product: null,
  isLoading: false,
  error: null,
  isHydrateSuccess: false
};

export const FEATURE_KEY = 'product';
export const PRODUCT_STORE_TRANSFER_KEY = makeStateKey<IState>('productStoreTransferKey');

export const productReducer = createReducer<IState>(
  initialState,
  on(hydrateSuccessAction, (store, action) => ({
    ...store,
    ...action.payload,
    isHydrateSuccess: true
  })),
  on(hydrateErrorAction, (store) => ({
    ...store
  })),
  on(requestAction, (store) => ({
    ...store,
    isLoading: true,
    error: null
  })),
  on(requestSuccessAction, (state, payload) => ({
    ...state,
    isLoading: false,
    product: payload.product
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
