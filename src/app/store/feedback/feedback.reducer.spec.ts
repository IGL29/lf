import {
  ENTITY,
  requestAction,
  requestErrorAction,
  requestSuccessAction
} from './feedback.actions';
import { feedbackReducer, initialState } from './feedback.reducer';

describe(`${ENTITY} reducer`, () => {
  it('should return initial state', () => {
    expect(feedbackReducer(undefined, <any>{})).toEqual(initialState);
  });

  it('should set isLoading to true', () => {
    const state = { ...initialState, isLoading: true };
    expect(feedbackReducer(undefined, requestAction(<any>{}))).toEqual(state);
  });

  it('should set isLoading to false and set error', () => {
    const previousState = { ...initialState, isLoading: true };
    const currentState = { ...initialState, isLoading: false, error: 'some error' };
    expect(feedbackReducer(previousState, requestErrorAction({ error: 'some error' }))).toEqual(
      currentState
    );
  });

  it('should set isLoading to false', () => {
    const previousState = { ...initialState, isLoading: true };
    const currentState = { ...initialState, isLoading: false };
    expect(feedbackReducer(previousState, requestSuccessAction())).toEqual(currentState);
  });
});
