import { ENTITY, addAction, removeAction, removeAllAction } from './notifications.actions';
import { IState, initialState, notificationsReducer } from './notifications.reducer';

describe(`${ENTITY} reducer`, () => {
  it('should return initial state', () => {
    expect(notificationsReducer(undefined, <any>{})).toEqual(initialState);
  });

  it('should add notify to list', () => {
    const previousState = { ...initialState };
    const currentState: IState = {
      ...initialState,
      list: [{ title: 'some title', type: 'warn', id: 'id' }]
    };
    expect(
      notificationsReducer(
        previousState,
        addAction({ notify: { title: 'some title', type: 'warn', id: 'id' } })
      )
    ).toEqual(currentState);
  });

  it('should remove notify from list', () => {
    const previousState: IState = {
      ...initialState,
      list: [
        { title: 'some title', type: 'warn', id: '1' },
        { title: 'some title', type: 'warn', id: '2' }
      ]
    };
    const currentState: IState = {
      ...initialState,
      list: [{ title: 'some title', type: 'warn', id: '2' }]
    };
    expect(notificationsReducer(previousState, removeAction({ id: '1' }))).toEqual(currentState);
  });

  it('should remove all notifications from list', () => {
    const previousState: IState = {
      ...initialState,
      list: [
        { title: 'some title', type: 'warn', id: '1' },
        { title: 'some title', type: 'warn', id: '2' }
      ]
    };
    const currentState: IState = {
      ...initialState,
      list: []
    };
    expect(notificationsReducer(previousState, removeAllAction())).toEqual(currentState);
  });
});
