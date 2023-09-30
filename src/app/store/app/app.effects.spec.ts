import { provideMockActions } from '@ngrx/effects/testing';
import { AppEffects } from './app.effects';
import { provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';
import { ENTITY, startedAction } from './app.actions';
import { Observable, of, toArray } from 'rxjs';
import { Action } from '@ngrx/store';
import { cartStore } from '../cart';
import { productsStore } from '../products';

describe(`${ENTITY}`, () => {
  let actions$: Observable<Action>;
  let effects: AppEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppEffects, provideMockActions(() => actions$), provideMockStore()]
    });

    effects = TestBed.inject(AppEffects);
  });

  it('should dispatch requestAction of products and requestAction of cart', (done) => {
    actions$ = of(startedAction());
    effects.loadData$.pipe(toArray()).subscribe((fromEffectsAction) => {
      expect(fromEffectsAction).toEqual([productsStore.requestAction(), cartStore.requestAction()]);
      done();
    });
  });
});
