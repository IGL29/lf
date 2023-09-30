import { getMockProduct } from '__tests__/mocks/data/product';
import { ENTITY, requestAction, requestErrorAction, requestSuccessAction } from './product.actions';
import { initialState, productReducer } from './product.reducer';

describe(`${ENTITY} reducer`, () => {
  it('should return initial state', () => {
    expect(productReducer(undefined, <any>{})).toEqual(initialState);
  });

  it('should set isLoading to true', () => {
    const state = { ...initialState, isLoading: true };
    expect(productReducer(undefined, requestAction({ id: 1 }))).toEqual(state);
  });

  it('should set isLoading to false and set error', () => {
    const previousState = { ...initialState, isLoading: true };
    const currentState = { ...initialState, isLoading: false, error: 'some error' };
    expect(productReducer(previousState, requestErrorAction({ error: 'some error' }))).toEqual(
      currentState
    );
  });

  it('should set isLoading to false and set comments', () => {
    const previousState = { ...initialState, isLoading: true };
    const currentState = { ...initialState, isLoading: false, product: getMockProduct() };
    expect(
      productReducer(previousState, requestSuccessAction({ product: getMockProduct() }))
    ).toEqual(currentState);
  });
});
