import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { StoreService } from '../store/store.service';
import { mockStoreService } from '__tests__/mocks/services/StoreService';
import { of } from 'rxjs';
import { getMockProduct } from '__tests__/mocks/data/product';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StoreService,
          useValue: mockStoreService
        }
      ]
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call StoreService.dispatchRequestCart', () => {
    service.requestCart();
    expect(mockStoreService.dispatchRequestCart).toHaveBeenCalled();
  });

  it('should return stream with count', () => {
    const countStream$ = of(5);
    mockStoreService.getCountInCart.and.returnValue(countStream$);
    expect(service.getCountInCart()).toEqual(countStream$);
  });

  it('should return stream with cart', () => {
    const cartStream$ = of(5);
    mockStoreService.getCart.and.returnValue(cartStream$);
    expect(service.getCart()).toEqual(cartStream$);
  });

  it('should return stream with price', () => {
    const priceStream$ = of(1000);
    mockStoreService.getCartPrice.and.returnValue(priceStream$);
    expect(service.getPrice()).toEqual(priceStream$);
  });

  it('should return stream with discount', () => {
    const discountStream$ = of(1000);
    mockStoreService.getCartDiscount.and.returnValue(discountStream$);
    expect(service.getDiscount()).toEqual(discountStream$);
  });

  it('should call StoreService.dispatchPostToCart with cart item', () => {
    const cartItem = { product: getMockProduct(), count: 1 };
    service.addToCart(cartItem);
    expect(mockStoreService.dispatchPostToCart).toHaveBeenCalledWith(cartItem);
  });

  it('should call StoreService.dispatchDeleteFromCart with id', () => {
    const productId = 5;
    service.deleteFromCart(productId);
    expect(mockStoreService.dispatchDeleteFromCart).toHaveBeenCalledWith({ id: productId });
  });

  it('should call StoreService.dispatchChangeProductCount id and count', () => {
    const productId = 5;
    const count = 1;
    service.changeProductCount(productId, count);
    expect(mockStoreService.dispatchChangeProductCount).toHaveBeenCalledWith({
      id: productId,
      count
    });
  });

  it('should call StoreService.dispatchClearCart', () => {
    service.clearAll();
    expect(mockStoreService.dispatchClearCart).toHaveBeenCalled();
  });
});
