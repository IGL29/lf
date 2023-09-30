import { TestBed } from '@angular/core/testing';
import { ENTITY, requestAction, requestErrorAction, requestSuccessAction } from './order.actions';
import { OrderEffects } from './order.effects';
import { Router } from '@angular/router';
import { mockRouter } from '__tests__/mocks/router/router';
import { ApiOrderService } from 'src/app/services/api/api-order/api-order.service';
import { getMockApiOrderService } from '__tests__/mocks/services/ApiOrderService';
import { OrderService } from 'src/app/services/order/order.service';
import { mockOrderService } from '__tests__/mocks/services/OrderService';
import { CartService } from 'src/app/services/cart/cart.service';
import { mockCartService } from '__tests__/mocks/services/CartService';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

describe(`${ENTITY}`, () => {
  let router: Router;
  let apiOrderService: ReturnType<typeof getMockApiOrderService>;
  let orderService: OrderService;
  let cartService: CartService;
  let actions$: Observable<Action>;
  let effects: OrderEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderEffects,
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: ApiOrderService,
          useValue: getMockApiOrderService()
        },
        {
          provide: OrderService,
          useValue: mockOrderService
        },
        {
          provide: CartService,
          useValue: mockCartService
        },
        provideMockActions(() => actions$),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(OrderEffects);
    router = TestBed.inject(Router);
    apiOrderService = TestBed.inject(ApiOrderService);
    orderService = TestBed.inject(OrderService);
    cartService = TestBed.inject(CartService);
  });

  it('should dispatch requestSuccessAction with order id', (done) => {
    actions$ = of(requestAction(<any>{ user: { email: 'example@email.com' } }));
    apiOrderService.postOrder.and.returnValue(of({ id: 'orderId' }));
    effects.submitOrder$.subscribe((fromEffectsAction) => {
      expect(fromEffectsAction).toEqual(requestSuccessAction({ id: 'orderId' }));
      done();
    });
  });

  it('should call orderService.doClearForm', (done) => {
    actions$ = of(requestAction(<any>{ user: { email: 'example@email.com' } }));
    apiOrderService.postOrder.and.returnValue(of({ id: 'orderId' }));
    effects.submitOrder$.subscribe(() => {
      expect(orderService.doClearForm).toHaveBeenCalled();
      done();
    });
  });

  it('should call cartService.clearAll', (done) => {
    actions$ = of(requestAction(<any>{ user: { email: 'example@email.com' } }));
    apiOrderService.postOrder.and.returnValue(of({ id: 'orderId' }));
    effects.submitOrder$.subscribe(() => {
      expect(cartService.clearAll).toHaveBeenCalled();
      done();
    });
  });

  it('should call router.navigate with id', (done) => {
    actions$ = of(requestAction(<any>{ user: { email: 'example@email.com' } }));
    apiOrderService.postOrder.and.returnValue(of({ id: 'orderId' }));
    effects.submitOrder$.subscribe(() => {
      expect(router.navigate).toHaveBeenCalledWith(['/order/successful', 'orderId']);
      done();
    });
  });

  it('should dispatch requestErrorAction with error message', (done) => {
    actions$ = of(requestAction(<any>{ user: { email: 'example@email.com' } }));
    apiOrderService.postOrder.and.returnValue(throwError(() => 'some error'));
    effects.submitOrder$.subscribe((fromEffectsAction) => {
      expect(fromEffectsAction).toEqual(requestErrorAction({ error: 'some error' }));
      done();
    });
  });
});
