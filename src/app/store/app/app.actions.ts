import { createAction } from '@ngrx/store';

export const ENTITY = '[App]';

export const startedAction = createAction(`${ENTITY} started`);
