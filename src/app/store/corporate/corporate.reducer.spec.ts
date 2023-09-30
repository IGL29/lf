import {
  ENTITY,
  requestAction,
  requestErrorAction,
  requestSuccessAction
} from './corporate.actions';
import { corporateReducer, initialState } from './corporate.reducer';

describe(`${ENTITY} reducer`, () => {
  it('should return initial state', () => {
    expect(corporateReducer(undefined, <any>{})).toEqual(initialState);
  });

  it('should set isLoading to true', () => {
    const state = { ...initialState, isLoading: true };
    expect(corporateReducer(undefined, requestAction(<any>{}))).toEqual(state);
  });

  it('should set isLoading to false and set error', () => {
    const previousState = { ...initialState, isLoading: true };
    const currentState = { ...initialState, isLoading: false, error: 'some error' };
    expect(corporateReducer(previousState, requestErrorAction({ error: 'some error' }))).toEqual(
      currentState
    );
  });

  it('should set isLoading to false', () => {
    const previousState = { ...initialState, isLoading: true };
    const currentState = { ...initialState, isLoading: false };
    expect(corporateReducer(previousState, requestSuccessAction())).toEqual(currentState);
  });
});
