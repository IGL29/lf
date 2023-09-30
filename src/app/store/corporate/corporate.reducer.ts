import { createReducer, on } from '@ngrx/store';
import { requestAction, requestErrorAction, requestSuccessAction } from './corporate.actions';
import { ErrorPayload } from '~types/apiPayloads';

export type TIsLoading = boolean;

export interface IState {
  isLoading: TIsLoading;
  error: ErrorPayload['error'] | null;
}

export const initialState: IState = {
  isLoading: false,
  error: null
};

export const FEATURE_KEY = 'corporate';

export const corporateReducer = createReducer<IState>(
  initialState,
  on(requestAction, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(requestSuccessAction, (state) => ({
    ...state,
    isLoading: false
  })),
  on(requestErrorAction, (state, payload) => ({
    ...state,
    isLoading: false,
    error: payload.error
  }))
);
