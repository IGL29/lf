import { createAction, props } from '@ngrx/store';
import { ICorporateUser } from '~pages/corporate-clients/component/types';
import { ErrorPayload } from '~types/apiPayloads';

export const ENTITY = '[Corporate]';

export const requestAction = createAction(`${ENTITY} Request`, props<ICorporateUser>());

export const requestSuccessAction = createAction(`${ENTITY} Request Success`);

export const requestErrorAction = createAction(`${ENTITY} Request Error`, props<ErrorPayload>());
