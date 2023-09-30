import { createAction, props } from '@ngrx/store';
import { INotifyWithId } from './notifications.reducer';

export const ENTITY = '[Notifications]';

export const addAction = createAction(`${ENTITY} Add`, props<{ notify: INotifyWithId }>());

export const removeAction = createAction(`${ENTITY} Remove`, props<{ id: INotifyWithId['id'] }>());

export const removeAllAction = createAction(`${ENTITY} Remove All`);
