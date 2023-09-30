import { mockCartService } from '__tests__/mocks/services/CartService';
import { ApiCartService } from 'src/app/services/api/api-cart/api-cart.service';
import { CartEffects } from './cart.effects';
import { TestBed } from '@angular/core/testing';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import {
  ENTITY,
  clearAllAction,
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
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { getMockProduct } from '__tests__/mocks/data/product';

describe(`${ENTITY}`, () => {
  let apiCartService: ReturnType<typeof mockCartService>;
  let actions$: Observable<Action>;
  let effects: CartEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartEffects,
        {
          provide: ApiCartService,
          useValue: mockCartService
        },
        provideMockActions(() => actions$),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(CartEffects);
    apiCartService = TestBed.inject(ApiCartService);
  });

  it('should dispatch requestSuccessAction with order id', (done) => {
    actions$ = of(requestAction());
    apiCartService.getProducts.and.returnValue(
      of([
        { count: 1, product: getMockProduct() },
        { count: 2, product: getMockProduct() }
      ])
    );
    effects.loadCart$.subscribe((fromEffectsAction) => {
      expect(fromEffectsAction).toEqual(
        requestSuccessAction({
          inCart: [
            { count: 1, product: getMockProduct() },
            { count: 2, product: getMockProduct() }
          ]
        })
      );
      done();
    });
  });

  it('should dispatch requestErrorAction', (done) => {
    actions$ = of(requestAction());
    apiCartService.getProducts.and.returnValue(throwError(() => 'some error'));

    effects.loadCart$.subscribe((fromEffectsAction) => {
      expect(fromEffectsAction).toEqual(requestErrorAction({ error: 'some error' }));
      done();
    });
  });

  it('should dispatch postProductSuccessAction with cart', (done) => {
    actions$ = of(postProductAction({ count: 2, product: getMockProduct() }));
    apiCartService.addProduct.and.returnValue(of([{ count: 2, product: getMockProduct() }]));
    effects.postToCart$.subscribe((fromEffectsAction) => {
      expect(fromEffectsAction).toEqual(
        postProductSuccessAction({
          inCart: [{ count: 2, product: getMockProduct() }]
        })
      );
      done();
    });
  });

  it('should dispatch postProductErrorAction', (done) => {
    actions$ = of(postProductAction({ count: 2, product: getMockProduct() }));
    apiCartService.addProduct.and.returnValue(throwError(() => 'some error'));

    effects.postToCart$.subscribe((fromEffectsAction) => {
      expect(fromEffectsAction).toEqual(postProductErrorAction({ error: 'some error' }));
      done();
    });
  });

  it('should dispatch deleteProductSuccessAction with cart', (done) => {
    actions$ = of(deleteProductAction({ id: 1 }));
    apiCartService.deleteProduct.and.returnValue(
      of([{ count: 2, product: getMockProduct({ id: 2 }) }])
    );
    effects.deleteFromCart$.subscribe((fromEffectsAction) => {
      expect(fromEffectsAction).toEqual(
        deleteProductSuccessAction({
          inCart: [{ count: 2, product: getMockProduct({ id: 2 }) }]
        })
      );
      done();
    });
  });

  it('should dispatch deleteProductErrorAction', (done) => {
    actions$ = of(deleteProductAction({ id: 2 }));
    apiCartService.deleteProduct.and.returnValue(throwError(() => 'some error'));

    effects.deleteFromCart$.subscribe((fromEffectsAction) => {
      expect(fromEffectsAction).toEqual(deleteProductErrorAction({ error: 'some error' }));
      done();
    });
  });

  it('should dispatch postChangeCountSuccessAction', (done) => {
    actions$ = of(postChangeCountAction({ id: 1, count: 4 }));
    apiCartService.changeProductCount.and.returnValue(
      of([{ count: 4, product: getMockProduct({ id: 1 }) }])
    );
    effects.changeProductCount$.subscribe((fromEffectsAction) => {
      expect(fromEffectsAction).toEqual(
        postChangeCountSuccessAction({
          inCart: [{ count: 4, product: getMockProduct({ id: 1 }) }]
        })
      );
      done();
    });
  });

  it('should dispatch postChangeCountErrorAction', (done) => {
    actions$ = of(postChangeCountAction({ id: 1, count: 4 }));
    apiCartService.changeProductCount.and.returnValue(throwError(() => 'some error'));

    effects.changeProductCount$.subscribe((fromEffectsAction) => {
      expect(fromEffectsAction).toEqual(postChangeCountErrorAction({ error: 'some error' }));
      done();
    });
  });

  it('should dispatch postChangeCountSuccessAction', (done) => {
    actions$ = of(clearAllAction());
    apiCartService.clearAll.and.returnValue(of([]));
    effects.clearCart$.subscribe((fromEffectsAction) => {
      expect(fromEffectsAction).toEqual(
        postChangeCountSuccessAction({
          inCart: []
        })
      );
      done();
    });
  });

  it('should dispatch postChangeCountErrorAction', (done) => {
    actions$ = of(clearAllAction());
    apiCartService.clearAll.and.returnValue(throwError(() => 'some error'));

    effects.clearCart$.subscribe((fromEffectsAction) => {
      expect(fromEffectsAction).toEqual(postChangeCountErrorAction({ error: 'some error' }));
      done();
    });
  });
});
