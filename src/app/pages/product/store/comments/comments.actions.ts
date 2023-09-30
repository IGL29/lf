import { createAction, props } from '@ngrx/store';
import { INewReview } from '~components/review-form/types';
import { IReview } from '~components/review/types';
import { ErrorPayload } from '~types/apiPayloads';
import { IProduct } from '~types/product';

export const ENTITY = '[Comments]';

export const requestAction = createAction(`${ENTITY} Request`, props<{ id: IProduct['id'] }>());
export const requestSuccessAction = createAction(
  `${ENTITY} Request success`,
  props<{ comments: IReview[] }>()
);
export const requestErrorAction = createAction(
  `${ENTITY} Request error`,
  props<{ error: ErrorPayload['error'] }>()
);

export const postAction = createAction(`${ENTITY} Post`, props<{ data: INewReview }>());
export const postSuccessAction = createAction(`${ENTITY} Post Success`);
export const postErrorAction = createAction(
  `${ENTITY} Post Error`,
  props<{ error: ErrorPayload['error'] }>()
);
