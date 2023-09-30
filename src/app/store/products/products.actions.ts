import { createAction, props } from '@ngrx/store';
import { ErrorPayload } from '~types/apiPayloads';
import { IProduct } from '~types/product';
import { initialState } from './products.reducer';

export const ENTITY = '[Products]';

export const hydrateAction = createAction(`${ENTITY} hydrate`);

export const hydrateSuccessAction = createAction(
  `${ENTITY}  hydrate Success`,
  props<{ payload: typeof initialState }>()
);
export const hydrateErrorAction = createAction(`${ENTITY}  hydrate Error`);

export const requestAction = createAction(`${ENTITY} Request`);

export const requestSuccessAction = createAction(
  `${ENTITY} Request Success`,
  props<{ products: Array<IProduct> }>()
);

export const requestErrorAction = createAction(`${ENTITY} Request Error`, props<ErrorPayload>());

export const requestCancelAction = createAction(`${ENTITY} Request Cancel`);
