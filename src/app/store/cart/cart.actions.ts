import { createAction, props } from '@ngrx/store';
import {
  CartResponsePayload,
  ChangeCountRequestPayload,
  ChangeCountResponsePayload,
  ClearCartResponsePayload,
  DeleteFromCartRequestPayload,
  DeleteFromCartResponsePayload,
  ErrorPayload,
  PostToCartRequestPayload,
  PostToCartResponsePayload
} from '~types/apiPayloads';

export const ENTITY = '[Cart]';

export const requestAction = createAction(`${ENTITY} Request`);

export const requestSuccessAction = createAction(
  `${ENTITY} Request Success`,
  props<CartResponsePayload>()
);

export const requestErrorAction = createAction(`${ENTITY} Request Error`, props<ErrorPayload>());

export const postProductAction = createAction(
  `${ENTITY} Post Product`,
  props<PostToCartRequestPayload>()
);

export const postProductSuccessAction = createAction(
  `${ENTITY} Post Product Success`,
  props<PostToCartResponsePayload>()
);

export const postProductErrorAction = createAction(
  `${ENTITY} Post Product Error`,
  props<ErrorPayload>()
);

export const deleteProductAction = createAction(
  `${ENTITY} Delete Product`,
  props<DeleteFromCartRequestPayload>()
);

export const deleteProductSuccessAction = createAction(
  `${ENTITY} Delete Product Success`,
  props<DeleteFromCartResponsePayload>()
);

export const deleteProductErrorAction = createAction(
  `${ENTITY} Delete Product Error`,
  props<ErrorPayload>()
);

export const clearAllAction = createAction(`${ENTITY} Clear All`);

export const clearAllSuccessAction = createAction(
  `${ENTITY}  Clear All Success`,
  props<ClearCartResponsePayload>()
);

export const clearAllErrorAction = createAction(
  `${ENTITY}  Clear All Error`,
  props<ErrorPayload>()
);

export const postChangeCountAction = createAction(
  `${ENTITY} Change Count`,
  props<ChangeCountRequestPayload>()
);

export const postChangeCountSuccessAction = createAction(
  `${ENTITY}  Change Count Success`,
  props<ChangeCountResponsePayload>()
);

export const postChangeCountErrorAction = createAction(
  `${ENTITY}  Change Count Error`,
  props<ErrorPayload>()
);
