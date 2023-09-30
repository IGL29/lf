import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartMenuComponent } from './cart-menu.component';
import { getMockProduct } from '__tests__/mocks/data/product';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { Cart } from 'src/app/services/cart-storage/cart-storage.service';
import { findElement } from '__tests__/utils/findElement';
import { provideAnimations } from '@angular/platform-browser/animations';
import { findAllElements } from '__tests__/utils/findAllElements';

describe('CartMenuComponent', () => {
  let component: CartMenuComponent;
  let fixture: ComponentFixture<CartMenuComponent>;
  const cart: Cart = [
    { product: getMockProduct({ id: 1 }), count: 1 },
    { product: getMockProduct({ id: 2 }), count: 1 }
  ];

  beforeEach(async () => {
    TestBed.overrideComponent(CartMenuComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    });
    await TestBed.configureTestingModule({
      declarations: [CartMenuComponent],
      providers: [provideAnimations()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CartMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('class', () => {
    it('should set _inCartProducts and inCartNotEmpty', () => {
      component.inCartProducts = cart;
      expect(component['_inCartProducts']).toEqual(cart);
      expect(component['isCartNotEmpty']).toBeTrue();
    });

    it('should call emitChangeProductCount.emit with id and count', (done) => {
      const productId = 1;
      const count = 5;
      component.emitChangeProductCount.subscribe((value) => {
        expect(value).toEqual({ id: productId, count });
        done();
      });
      component['onChangeProductCount'](getMockProduct({ id: productId }), count);
    });

    it('should not call emitChangeProductCount.emit if count is ziro', () => {
      const productId = 1;
      const count = 0;
      spyOn(component.emitChangeProductCount, 'emit');
      component['onChangeProductCount'](getMockProduct({ id: productId }), count);
      expect(component.emitChangeProductCount.emit).not.toHaveBeenCalled();
    });

    it('should call emitCloseMenu.emit', () => {
      spyOn(component.emitCloseMenu, 'emit');
      component.closeMenu();
      expect(component.emitCloseMenu.emit).toHaveBeenCalled();
    });

    it('should call emitAddToCart.emit with product and count', () => {
      const product = getMockProduct();
      spyOn(component.emitAddToCart, 'emit');
      component['addToCart'](product);
      expect(component.emitAddToCart.emit).toHaveBeenCalledWith({ product, count: 1 });
    });

    it('should call emitDeleteFromCart.emit with id', () => {
      const productId = 5;
      spyOn(component.emitDeleteFromCart, 'emit');
      component['deleteFromCart'](productId);
      expect(component.emitDeleteFromCart.emit).toHaveBeenCalledWith(productId);
    });

    it('should return product id', () => {
      const cartItem = cart[0];
      const index = 0;
      expect(component['trackByProductId'](index, cartItem)).toBe(cartItem.product.id);
    });
  });

  describe('template', () => {
    it('should call closeMenu if button clicked', () => {
      const btnCloseDebugEl = findElement(fixture, '[data-test="btnClose"]');
      component['closeMenu'] = jasmine.createSpy();
      btnCloseDebugEl.triggerEventHandler('click');
      fixture.detectChanges();
      expect(component['closeMenu']).toHaveBeenCalled();
    });

    it('should render items from inCartProducts', () => {
      spyOnProperty(component, 'inCartProducts', 'get').and.returnValue(cart);
      fixture.detectChanges();
      const itemsDebugElements = findAllElements(fixture, '[data-test="cartItem"]');
      expect(itemsDebugElements.length).toBe(cart.length);
    });

    describe('ProductItemComponent', () => {
      it('should pass product', () => {
        spyOnProperty(component, 'inCartProducts', 'get').and.returnValue(cart);
        fixture.detectChanges();
        const productItemCompDebugEl = findElement(fixture, '[data-test="productItemComponent"]');
        expect(productItemCompDebugEl.nativeElement.product).toEqual(cart[0].product);
      });

      it('should pass count', () => {
        spyOnProperty(component, 'inCartProducts', 'get').and.returnValue(cart);
        fixture.detectChanges();
        const productItemCompDebugEl = findElement(fixture, '[data-test="productItemComponent"]');
        expect(productItemCompDebugEl.nativeElement.count).toBe(cart[0].count);
      });

      it('should pass minCount', () => {
        spyOnProperty(component, 'inCartProducts', 'get').and.returnValue(cart);
        component['minProductCount'] = 5;
        fixture.detectChanges();
        const productItemCompDebugEl = findElement(fixture, '[data-test="productItemComponent"]');
        expect(productItemCompDebugEl.nativeElement.minCount).toBe(5);
      });

      it('should call onChangeProductCount with product and count', () => {
        spyOnProperty(component, 'inCartProducts', 'get').and.returnValue(cart);
        fixture.detectChanges();
        const productItemCompDebugEl = findElement(fixture, '[data-test="productItemComponent"]');
        component['onChangeProductCount'] = jasmine.createSpy();
        productItemCompDebugEl.triggerEventHandler('countChange', 7);
        expect(component['onChangeProductCount']).toHaveBeenCalledWith(cart[0].product, 7);
      });

      it('should call deleteFromCart with product id', () => {
        spyOnProperty(component, 'inCartProducts', 'get').and.returnValue(cart);
        fixture.detectChanges();
        const productItemCompDebugEl = findElement(fixture, '[data-test="productItemComponent"]');
        component['deleteFromCart'] = jasmine.createSpy();
        productItemCompDebugEl.triggerEventHandler('emitDeleteFromCart', cart[0].product.id);
        expect(component['deleteFromCart']).toHaveBeenCalledWith(cart[0].product.id);
      });

      it('should call deleteFromCart with product id', () => {
        spyOnProperty(component, 'inCartProducts', 'get').and.returnValue(cart);
        fixture.detectChanges();
        const productItemCompDebugEl = findElement(fixture, '[data-test="productItemComponent"]');
        component['deleteFromCart'] = jasmine.createSpy();
        productItemCompDebugEl.triggerEventHandler('emitDeleteFromCart', cart[0].product.id);
        expect(component['deleteFromCart']).toHaveBeenCalledWith(cart[0].product.id);
      });
    });

    it('should show if isOfferProductsLoading is true', () => {
      component['isOfferProductsLoading'] = true;
      fixture.detectChanges();
      const loaderDebugEl = findElement(fixture, '[data-test="loader"]');
      expect(loaderDebugEl).toBeTruthy();
    });

    it('should show if isOfferProductsLoading is true', () => {
      component['isOfferProductsLoading'] = true;
      fixture.detectChanges();
      const loaderDebugEl = findElement(fixture, '[data-test="loader"]');
      expect(loaderDebugEl).toBeTruthy();
    });

    it('should render offerProducts', () => {
      const offerProducts = [getMockProduct({ id: 1 }), getMockProduct({ id: 2 })];
      component['offerProducts'] = offerProducts;
      component['isOfferProductsLoading'] = false;
      fixture.detectChanges();
      const itemsOfferProductsDebugEl = findAllElements(fixture, '[data-test="itemOfferProduct"]');
      expect(itemsOfferProductsDebugEl.length).toBe(offerProducts.length);
    });
  });
});
