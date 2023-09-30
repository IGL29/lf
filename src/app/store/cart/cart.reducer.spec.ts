import { getMockProduct } from '__tests__/mocks/data/product';
import {
  ENTITY,
  deleteProductAction,
  deleteProductErrorAction,
  deleteProductSuccessAction,
  postChangeCountAction,
  postChangeCountErrorAction,
  postChangeCountSuccessAction,
  postProductAction,
  postProductErrorAction,
  postProductSuccessAction,
  requestAction,
  requestErrorAction,
  requestSuccessAction
} from './cart.actions';
import { cartReducer, initialState } from './cart.reducer';

describe(`${ENTITY} Reducer`, () => {
  it('should return initial state', () => {
    expect(cartReducer(undefined, <any>{})).toEqual(initialState);
  });

  it('should set isLoading to true', () => {
    const state = { ...initialState, isLoading: true };
    expect(cartReducer(undefined, requestAction())).toEqual(state);
  });

  it('should set isLoading to false and set error', () => {
    const previousState = { ...initialState, isLoading: true };
    const currentState = { ...initialState, isLoading: false, error: 'some error' };
    expect(cartReducer(previousState, requestErrorAction({ error: 'some error' }))).toEqual(
      currentState
    );
  });

  it('should set inCart', () => {
    const previousState = { ...initialState };
    const newState = {
      ...initialState,
      isLoading: false,
      inCart: [{ count: 1, product: getMockProduct() }]
    };
    expect(
      cartReducer(
        previousState,
        requestSuccessAction({ inCart: [{ count: 1, product: getMockProduct() }] })
      )
    ).toEqual(newState);
  });

  it('should set isLoading to true', () => {
    const previousState = { ...initialState };
    const currentState = { ...initialState, isLoading: true };
    expect(
      cartReducer(previousState, postProductAction({ count: 1, product: getMockProduct() }))
    ).toEqual(currentState);
  });

  it('should set isLoading to false', () => {
    const previousState = { ...initialState, isLoading: true };
    const currentState = { ...initialState, isLoading: false, postError: 'some error' };
    expect(cartReducer(previousState, postProductErrorAction({ error: 'some error' }))).toEqual(
      currentState
    );
  });

  it('should set inCart and isLoading to false', () => {
    const previousState = { ...initialState, isLoading: true };
    const currentState = {
      ...initialState,
      isLoading: false,
      inCart: [{ count: 1, product: getMockProduct() }]
    };
    expect(
      cartReducer(
        previousState,
        postProductSuccessAction({ inCart: [{ count: 1, product: getMockProduct() }] })
      )
    ).toEqual(currentState);
  });

  it('should set isLoading to true', () => {
    const previousState = { ...initialState };
    const currentState = { ...initialState, isLoading: true };
    expect(cartReducer(previousState, postChangeCountAction({ count: 1, id: 1 }))).toEqual(
      currentState
    );
  });

  it('should set isLoading to false and set error', () => {
    const previousState = { ...initialState, isLoading: true };
    const currentState = { ...initialState, isLoading: false, error: 'some error' };
    expect(cartReducer(previousState, postChangeCountErrorAction({ error: 'some error' }))).toEqual(
      currentState
    );
  });

  it('should set isLoading to false and set inCart', () => {
    const previousState = {
      ...initialState,
      isLoading: true,
      inCart: [{ count: 1, product: getMockProduct() }]
    };
    const currentState = {
      ...initialState,
      isLoading: false,
      inCart: [{ count: 2, product: getMockProduct() }]
    };
    expect(
      cartReducer(
        previousState,
        postChangeCountSuccessAction({ inCart: [{ count: 2, product: getMockProduct() }] })
      )
    ).toEqual(currentState);
  });

  it('should set isLoading to true', () => {
    const previousState = { ...initialState };
    const currentState = { ...initialState, isLoading: true };
    expect(cartReducer(previousState, deleteProductAction({ id: 1 }))).toEqual(currentState);
  });

  it('should set isLoading to false and set error', () => {
    const previousState = { ...initialState };
    const currentState = { ...initialState, isLoading: false, error: 'some error' };
    expect(cartReducer(previousState, deleteProductErrorAction({ error: 'some error' }))).toEqual(
      currentState
    );
  });

  it('should set isLoading to false and set inCart', () => {
    const previousState = { ...initialState };
    const currentState = {
      ...initialState,
      isLoading: false,
      inCart: [{ count: 2, product: getMockProduct() }]
    };
    expect(
      cartReducer(
        previousState,
        deleteProductSuccessAction({ inCart: [{ count: 2, product: getMockProduct() }] })
      )
    ).toEqual(currentState);
  });
});
