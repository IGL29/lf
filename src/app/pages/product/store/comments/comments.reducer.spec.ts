import { getMockNewReview, getMockReview } from '__tests__/mocks/data/review';
import {
  ENTITY,
  postAction,
  postErrorAction,
  postSuccessAction,
  requestAction,
  requestErrorAction,
  requestSuccessAction
} from './comments.actions';
import { commentsReducer, initialState } from './comments.reducer';

describe(`${ENTITY} reducer`, () => {
  it('should return initial state', () => {
    expect(commentsReducer(undefined, <any>{})).toEqual(initialState);
  });

  it('should set isLoading to true', () => {
    const state = { ...initialState, isLoading: true };
    expect(commentsReducer(undefined, requestAction({ id: 1 }))).toEqual(state);
  });

  it('should set isLoading to false and set error', () => {
    const previousState = { ...initialState, isLoading: true };
    const currentState = { ...initialState, isLoading: false, error: 'some error' };
    expect(commentsReducer(previousState, requestErrorAction({ error: 'some error' }))).toEqual(
      currentState
    );
  });

  it('should set isLoading to false and set comments', () => {
    const previousState = { ...initialState, isLoading: true };
    const currentState = { ...initialState, isLoading: false, comments: [getMockReview()] };
    expect(
      commentsReducer(previousState, requestSuccessAction({ comments: [getMockReview()] }))
    ).toEqual(currentState);
  });

  it('should set postIsLoading to true and postError to null', () => {
    const previousState = { ...initialState, postIsLoading: false, postError: 'some error' };
    const currentState = { ...initialState, postIsLoading: true, postError: null };
    expect(commentsReducer(previousState, postAction({ data: getMockNewReview() }))).toEqual(
      currentState
    );
  });

  it('should set postIsLoading to false', () => {
    const previousState = { ...initialState, postIsLoading: true };
    const currentState = { ...initialState, postIsLoading: false };
    expect(commentsReducer(previousState, postSuccessAction())).toEqual(currentState);
  });

  it('should set postIsLoading to false and set error', () => {
    const previousState = { ...initialState, postIsLoading: true };
    const currentState = { ...initialState, postIsLoading: false, postError: 'some error' };
    expect(commentsReducer(previousState, postErrorAction({ error: 'some error' }))).toEqual(
      currentState
    );
  });
});
