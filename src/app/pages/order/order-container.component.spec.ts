import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderContainerComponent } from './order-container.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import { mockCartService } from '__tests__/mocks/services/CartService';
import { mockOrderService } from '__tests__/mocks/services/OrderService';
import { Subject } from 'rxjs';
import { getMockProduct } from '__tests__/mocks/data/product';

describe('OrderContainerComponent', () => {
  const countInCart$ = new Subject();
  const cart$ = new Subject();
  const discount$ = new Subject();
  const price$ = new Subject();
  const deleteFromCart$ = new Subject();
  let component: OrderContainerComponent;
  let fixture: ComponentFixture<OrderContainerComponent>;

  beforeEach(async () => {
    mockCartService['getCountInCart'].and.returnValue(countInCart$);
    mockCartService['getCart'].and.returnValue(cart$);
    mockCartService['deleteFromCart'].and.returnValue(deleteFromCart$);
    mockCartService['getPrice'].and.returnValue(price$);
    mockCartService['getDiscount'].and.returnValue(discount$);

    await TestBed.configureTestingModule({
      declarations: [OrderContainerComponent],
      providers: [
        {
          provide: CartService,
          useValue: mockCartService
        },
        {
          provide: OrderService,
          useValue: mockOrderService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set cartProductCount', () => {
    countInCart$.next(5);
    expect(component['cartProductCount']).toBe(5);
  });

  it('should set cart', () => {
    cart$.next([{ count: 3, product: getMockProduct() }]);
    expect(component['cart']).toEqual([{ count: 3, product: getMockProduct() }]);
  });

  it('should set cartPrice', () => {
    price$.next(1500);
    expect(component['cartPrice']).toBe(1500);
  });

  it('should set cartDiscount', () => {
    discount$.next(500);
    expect(component['cartDiscount']).toBe(500);
  });

  it('should call cartService.deleteFromCart with id', () => {
    component['deleteFromCart'](1);
    expect(mockCartService['deleteFromCart']).toHaveBeenCalledWith(1);
  });
});
