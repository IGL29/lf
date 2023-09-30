import { createReducer, on } from '@ngrx/store';
import { requestAction, requestErrorAction, requestSuccessAction } from './order.actions';
import { ErrorPayload } from '~types/apiPayloads';

export type TIsLoading = boolean;

export interface IState {
  isLoading: TIsLoading;
  error: ErrorPayload['error'] | null;
  id: string | null;
}

export const initialState: IState = {
  isLoading: false,
  error: null,
  id: null
};

export const FEATURE_KEY = 'order';

export const orderReducer = createReducer<IState>(
  initialState,
  on(requestAction, (state) => ({
    ...state,
    isLoading: true,
    error: null,
    id: null
  })),
  on(requestSuccessAction, (state, payload) => ({
    ...state,
    isLoading: false,
    id: payload.id
  })),
  on(requestErrorAction, (state, payload) => ({
    ...state,
    isLoading: false,
    error: payload.error
  }))
);
