import { createReducer, on } from '@ngrx/store';
import {
  postAction,
  postErrorAction,
  postSuccessAction,
  requestAction,
  requestErrorAction,
  requestSuccessAction
} from './comments.actions';
import { ErrorPayload } from '~types/apiPayloads';
import { IReview } from '~components/review/types';

export interface IState {
  comments: IReview[] | null;
  isLoading: boolean;
  error: ErrorPayload['error'] | null;
  postIsLoading: boolean;
  postError: ErrorPayload['error'] | null;
}

export const initialState: IState = {
  comments: null,
  isLoading: false,
  error: null,
  postIsLoading: false,
  postError: null
};

export const FEATURE_KEY = 'comments';

export const commentsReducer = createReducer(
  initialState,
  on(requestAction, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(requestSuccessAction, (state, payload) => ({
    ...state,
    isLoading: false,
    comments: payload.comments
  })),
  on(requestErrorAction, (state, payload) => ({
    ...state,
    isLoading: false,
    error: payload.error
  })),
  on(postAction, (state) => ({
    ...state,
    postIsLoading: true,
    postError: null
  })),
  on(postSuccessAction, (state) => ({
    ...state,
    postIsLoading: false
  })),
  on(postErrorAction, (state, payload) => ({
    ...state,
    postIsLoading: false,
    postError: payload.error
  }))
);
