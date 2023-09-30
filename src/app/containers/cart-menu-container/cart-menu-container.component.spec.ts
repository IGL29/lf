import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartMenuContainerComponent } from './cart-menu-container.component';
import { mockCartService } from '__tests__/mocks/services/CartService';
import { mockProductsService } from '__tests__/mocks/services/ProductsService';
import { mockProductsFilterService } from '__tests__/mocks/services/ProductsFilterService';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { ChangeDetectionStrategy, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { getMockProduct } from '__tests__/mocks/data/product';
import { ProductsFilterService } from 'src/app/services/products-filter/products-filter.service';
import { findElement } from '__tests__/utils/findElement';

describe('CartMenuContainerComponent', () => {
  let component: CartMenuContainerComponent;
  let fixture: ComponentFixture<CartMenuContainerComponent>;
  let cartMenuDebugElement: DebugElement;
  const cartProducts = [{ product: getMockProduct(), count: 1 }];
  const products = [getMockProduct({ categories: ['balloon'] })];

  mockProductsService.getProducts.and.returnValue(of(products));
  mockProductsService.productsIsLoading.and.returnValue(of(true));
  mockCartService.getCart.and.returnValue(of(cartProducts));
  mockCartService.getPrice.and.returnValue(of(0));

  beforeEach(async () => {
    TestBed.overrideComponent(CartMenuContainerComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    });
    await TestBed.configureTestingModule({
      declarations: [CartMenuContainerComponent],
      providers: [
        { provide: CartService, useValue: mockCartService },
        { provide: ProductsService, useValue: mockProductsService },
        { provide: ProductsFilterService, useValue: mockProductsFilterService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CartMenuContainerComponent);
    component = fixture.componentInstance;
    mockProductsService.getProducts.and.returnValue(of(products));
    fixture.detectChanges();
    cartMenuDebugElement = findElement(fixture, '[data-test="cartMenu"]');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('class', () => {
    it('should subscribe', () => {
      component['subscribeToProductsInCart'] = jasmine.createSpy();
      component['subscribeToCartPrice'] = jasmine.createSpy();
      component['subscribeToProducts'] = jasmine.createSpy();
      component['subscribeToProductsLoading'] = jasmine.createSpy();
      component.ngOnInit();

      expect(component['subscribeToProductsInCart']).toHaveBeenCalled();
      expect(component['subscribeToCartPrice']).toHaveBeenCalled();
      expect(component['subscribeToProducts']).toHaveBeenCalled();
      expect(component['subscribeToProductsLoading']).toHaveBeenCalled();
    });

    it('should unsubscribe', () => {
      component['destroySubject'] = jasmine.createSpyObj(['next', 'complete']);
      component.ngOnDestroy();
      expect(component['destroySubject'].next).toHaveBeenCalled();
      expect(component['destroySubject'].complete).toHaveBeenCalled();
    });

    it('should set cart price from stream', () => {
      mockCartService.getPrice.and.returnValue(of(200));
      component['subscribeToCartPrice']();
      expect(component['cartPrice']).toBe(200);
    });

    it('should set cart data from stream to inCartProducts', () => {
      mockCartService.getCart.and.returnValue(of(cartProducts));
      component['subscribeToProductsInCart']();
      expect(component['inCartProducts']).toEqual(<any>cartProducts);
    });

    it('should set products data from stream to recommendedProducts with category', () => {
      mockProductsFilterService.isHasCategory.and.returnValue(true);
      component['subscribeToProducts']();
      expect(component['recommendedProducts']).toEqual(<any>products);
    });

    it('should set products loading from stream to isOfferProductsLoading', () => {
      component['subscribeToProductsLoading']();
      expect(component['isOfferProductsLoading']).toBe(true);
    });

    it('should call cartService.changeProductCount with id and count', () => {
      component['onChangeProductCount']({ id: 5, count: 3 });
      expect(mockCartService.changeProductCount).toHaveBeenCalledWith(5, 3);
    });

    it('should not call cartService.changeProductCount if count is zero', () => {
      mockCartService.changeProductCount.calls.reset();
      component['onChangeProductCount']({ id: 5, count: 0 });
      expect(mockCartService.changeProductCount).not.toHaveBeenCalled();
    });

    it('should call cartService.deleteFromCart with id', () => {
      component['deleteFromCart'](5);
      expect(mockCartService.deleteFromCart).toHaveBeenCalledWith(5);
    });

    it('should call cartService.addToCart with cart item', () => {
      component['addToCart']({ product: getMockProduct(), count: 2 });
      expect(mockCartService.addToCart).toHaveBeenCalledWith({
        product: getMockProduct(),
        count: 2
      });
    });

    it('should return product id', () => {
      expect(
        component['trackByProductId'](0, { product: getMockProduct({ id: 2 }), count: 3 })
      ).toBe(2);
    });

    it('should call emitCloseMenu.emit', () => {
      component['emitCloseMenu'].emit = jasmine.createSpy();
      component['closeMenu']();
      expect(component['emitCloseMenu'].emit).toHaveBeenCalled();
    });
  });

  describe('template', () => {
    it('should pass inCartProdcuts to cart menu', () => {
      component['_inCartProducts'] = cartProducts;
      fixture.detectChanges();
      expect(cartMenuDebugElement.nativeElement.inCartProducts).toEqual(cartProducts);
    });

    it('should pass offerProducts to cart menu', () => {
      component['recommendedProducts'] = products;
      fixture.detectChanges();
      expect(cartMenuDebugElement.nativeElement.offerProducts).toEqual(products);
    });

    it('should pass isOfferProductsLoading to cart menu', () => {
      component['isOfferProductsLoading'] = true;
      fixture.detectChanges();
      expect(cartMenuDebugElement.nativeElement.isOfferProductsLoading).toBe(true);
    });

    it('should pass cartPrice to cart menu', () => {
      component['cartPrice'] = 1000;
      fixture.detectChanges();
      expect(cartMenuDebugElement.nativeElement.cartPrice).toBe(1000);
    });

    it('should call addToCart with cart item if emit emitAddToCart event', () => {
      component['addToCart'] = jasmine.createSpy();
      cartMenuDebugElement.triggerEventHandler('emitAddToCart', {
        product: getMockProduct(),
        count: 3
      });
      expect(component['addToCart']).toHaveBeenCalledWith({ product: getMockProduct(), count: 3 });
    });

    it('should call onChangeProductCount with product id and count if emit emitChangeProductCount event', () => {
      component['onChangeProductCount'] = jasmine.createSpy();
      cartMenuDebugElement.triggerEventHandler('emitChangeProductCount', {
        id: 5,
        count: 3
      });
      expect(component['onChangeProductCount']).toHaveBeenCalledWith({ id: 5, count: 3 });
    });

    it('should call deleteFromCart with product id if emit emitDeleteFromCart event', () => {
      component['deleteFromCart'] = jasmine.createSpy();
      cartMenuDebugElement.triggerEventHandler('emitDeleteFromCart', 5);
      expect(component['deleteFromCart']).toHaveBeenCalledWith(5);
    });

    it('should call closeMenu if emit emitCloseMenu event', () => {
      component['closeMenu'] = jasmine.createSpy();
      cartMenuDebugElement.triggerEventHandler('emitCloseMenu', 5);
      expect(component['closeMenu']).toHaveBeenCalled();
    });
  });
});
