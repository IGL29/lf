import { createReducer, on } from '@ngrx/store';
import { INotify } from '~components/notify/types';
import { addAction, removeAction, removeAllAction } from './notifications.actions';

export type TIsLoading = boolean;

export interface INotifyWithId extends INotify {
  id: string;
}

export interface IState {
  list: INotifyWithId[];
}

export const initialState: IState = {
  list: []
};

export const FEATURE_KEY = 'notifications';

export const notificationsReducer = createReducer<IState>(
  initialState,
  on(addAction, (state, payload) => ({
    ...state,
    list: [...state.list, payload.notify]
  })),
  on(removeAction, (state, payload) => ({
    ...state,
    list: state.list.filter((notify: INotifyWithId) => notify.id !== payload.id)
  })),
  on(removeAllAction, (state) => ({
    ...state,
    list: []
  }))
);
