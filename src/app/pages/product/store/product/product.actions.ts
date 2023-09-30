import { createAction, props } from '@ngrx/store';
import { IProduct } from 'src/types/product';
import { ErrorPayload } from '~types/apiPayloads';
import { initialState } from './product.reducer';

export const ENTITY = '[Product]';

export const hydrateAction = createAction(`${ENTITY} hydrate`);
export const noHydrateAction = createAction(`${ENTITY} no hydrate`);

export const hydrateSuccessAction = createAction(
  `${ENTITY}  hydrate Success`,
  props<{ payload: typeof initialState }>()
);
export const hydrateErrorAction = createAction(`${ENTITY}  hydrate Error`);

export const requestAction = createAction(`${ENTITY} Request`, props<{ id: IProduct['id'] }>());

export const requestSuccessAction = createAction(
  `${ENTITY} Request Success`,
  props<{ product: IProduct }>()
);

export const requestErrorAction = createAction(`${ENTITY} Request Error`, props<ErrorPayload>());

export const requestCancelAction = createAction(`${ENTITY} Request Cancel`);
