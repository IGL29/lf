import { createAction, props } from '@ngrx/store';
import { ErrorPayload, FeedbackRequestPayload } from '~types/apiPayloads';

export const ENTITY = '[Feedback]';

export const requestAction = createAction(`${ENTITY} Request`, props<FeedbackRequestPayload>());

export const requestSuccessAction = createAction(`${ENTITY} Request Success`);

export const requestErrorAction = createAction(`${ENTITY} Request Error`, props<ErrorPayload>());
