import { Observable, of } from 'rxjs';
import { ENTITY, addAction } from './notifications.actions';
import { Action } from '@ngrx/store';
import { NotificationsEffects } from './notifications.effects';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { feedbackStore } from '../feedback';
import { corporateStore } from '../corporate';
import { orderStore } from '../order';
import { commentsStore } from '~pages/product/store/comments';
import { cartStore } from '../cart';

describe(`${ENTITY}`, () => {
  const ADD_ACTION = `${ENTITY} Add`;
  let actions$: Observable<Action>;
  let effects: NotificationsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationsEffects, provideMockActions(() => actions$), provideMockStore()]
    });

    effects = TestBed.inject(NotificationsEffects);
  });

  it('should dispatch addAction if dispatch feedbackStore.requestSuccessAction', (done) => {
    actions$ = of(feedbackStore.requestSuccessAction());

    effects.postFeedback$.subscribe((fromEffectsAction) => {
      expect(fromEffectsAction.type).toBe(ADD_ACTION);
      done();
    });
  });

  it('should dispatch addAction if dispatch corporateStore.requestSuccessAction', (done) => {
    actions$ = of(corporateStore.requestSuccessAction());

    effects.postCorporate$.subscribe((fromEffectsAction) => {
      expect(fromEffectsAction.type).toBe(ADD_ACTION);
      done();
    });
  });

  it('should dispatch addAction if dispatch orderStore.requestSuccessAction', (done) => {
    actions$ = of(orderStore.requestSuccessAction({ id: 'orderId' }));

    effects.postOrder$.subscribe((fromEffectsAction) => {
      expect(fromEffectsAction.type).toBe(ADD_ACTION);
      done();
    });
  });

  it('should dispatch addAction if dispatch commentsStore.requestSuccessAction', (done) => {
    actions$ = of(commentsStore.postSuccessAction());

    effects.postComment$.subscribe((fromEffectsAction) => {
      expect(fromEffectsAction.type).toBe(ADD_ACTION);
      done();
    });
  });

  it('should dispatch addAction if dispatch cartStore.requestSuccessAction', (done) => {
    actions$ = of(cartStore.postProductSuccessAction({ inCart: [] }));

    effects.addToCart$.subscribe((fromEffectsAction) => {
      expect(fromEffectsAction.type).toBe(ADD_ACTION);
      done();
    });
  });
});
