import { getMockProduct } from '__tests__/mocks/data/product';
import {
  ENTITY,
  requestAction,
  requestErrorAction,
  requestSuccessAction
} from './products.actions';
import { initialState, productsReducer } from './products.reducer';

describe(`${ENTITY} reducer`, () => {
  it('should return initial state', () => {
    expect(productsReducer(undefined, <any>{})).toEqual(initialState);
  });

  it('should set isLoading to true', () => {
    const state = { ...initialState, isLoading: true };
    expect(productsReducer(undefined, requestAction())).toEqual(state);
  });

  it('should set isLoading to false and set error', () => {
    const previousState = { ...initialState, isLoading: true };
    const currentState = { ...initialState, isLoading: false, error: 'some error' };
    expect(productsReducer(previousState, requestErrorAction({ error: 'some error' }))).toEqual(
      currentState
    );
  });

  it('should set isLoading to false and set products', () => {
    const previousState = { ...initialState, isLoading: true };
    const currentState = { ...initialState, isLoading: false, products: [getMockProduct()] };
    expect(
      productsReducer(previousState, requestSuccessAction({ products: [getMockProduct()] }))
    ).toEqual(currentState);
  });
});
