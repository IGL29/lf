import { ENTITY, requestAction, requestErrorAction, requestSuccessAction } from './order.actions';
import { initialState, orderReducer } from './order.reducer';

describe(`${ENTITY} reducer`, () => {
  it('should return initial state', () => {
    expect(orderReducer(undefined, <any>{})).toEqual(initialState);
  });

  it('should set isLoading to true', () => {
    const state = { ...initialState, isLoading: true };
    expect(orderReducer(undefined, requestAction(<any>{}))).toEqual(state);
  });

  it('should set isLoading to false and set error', () => {
    const previousState = { ...initialState, isLoading: true };
    const currentState = { ...initialState, isLoading: false, error: 'some error' };
    expect(orderReducer(previousState, requestErrorAction({ error: 'some error' }))).toEqual(
      currentState
    );
  });

  it('should set isLoading to false and set id', () => {
    const previousState = { ...initialState, isLoading: true };
    const currentState = { ...initialState, isLoading: false, id: 'orderId' };
    expect(orderReducer(previousState, requestSuccessAction({ id: 'orderId' }))).toEqual(
      currentState
    );
  });
});
