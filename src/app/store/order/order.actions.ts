import { createAction, props } from '@ngrx/store';
import { IOrderData } from '~pages/order/component/types';
import { ErrorPayload, OrderResponsePayload } from '~types/apiPayloads';

export const ENTITY = '[Order]';

export const requestAction = createAction(`${ENTITY} Request`, props<IOrderData>());

export const requestSuccessAction = createAction(
  `${ENTITY} Request Success`,
  props<OrderResponsePayload>()
);

export const requestErrorAction = createAction(`${ENTITY} Request Error`, props<ErrorPayload>());
