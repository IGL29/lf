import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsOfferContainerComponent } from './products-offer-container.component';
import { ProductsService } from 'src/app/services/products/products.service';
import { mockProductsData, mockProductsService } from '__tests__/mocks/services/ProductsService';
import { CartService } from 'src/app/services/cart/cart.service';
import { mockCartService } from '__tests__/mocks/services/CartService';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { getMockProduct } from '__tests__/mocks/data/product';
import { findElement } from '__tests__/utils/findElement';
import { of } from 'rxjs';

describe('ProductsOfferContainerComponent', () => {
  let component: ProductsOfferContainerComponent;
  let fixture: ComponentFixture<ProductsOfferContainerComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(ProductsOfferContainerComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    });
    await TestBed.configureTestingModule({
      declarations: [ProductsOfferContainerComponent],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService
        },
        {
          provide: CartService,
          useValue: mockCartService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsOfferContainerComponent);
    component = fixture.componentInstance;
    mockProductsService.getProducts.and.returnValue(of(mockProductsData));
    mockProductsService.productsIsLoading.and.returnValue(of(true));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('class', () => {
    it('should subscribe', () => {
      component['subscribeToProducts'] = jasmine.createSpy();
      component['subscribeToProductsLoading'] = jasmine.createSpy();
      component.ngOnInit();
      expect(component['subscribeToProducts']).toHaveBeenCalled();
      expect(component['subscribeToProductsLoading']).toHaveBeenCalled();
    });

    it('should unsubscribe', () => {
      component['destroySubject'] = jasmine.createSpyObj(['next', 'complete']);
      component.ngOnDestroy();
      expect(component['destroySubject'].next).toHaveBeenCalled();
      expect(component['destroySubject'].complete).toHaveBeenCalled();
    });

    it('should set products to offerProducts', () => {
      component['subscribeToProducts']();
      expect(component['offerProducts']).toEqual(mockProductsData);
    });

    it('should set state products loading to offerProducts', () => {
      component['subscribeToProductsLoading']();
      expect(component['isLoading']).toBe(true);
    });

    it('should call cartService.addToCart with cart item', () => {
      component['addToCart']({ product: getMockProduct({ id: 1 }), count: 1 });
      expect(mockCartService['addToCart']).toHaveBeenCalledWith({
        product: getMockProduct({ id: 1 }),
        count: 1
      });
    });
  });

  describe('template', () => {
    it('should pass products to products slider component', () => {
      component['offerProducts'] = mockProductsData;
      fixture.detectChanges();
      const productsOfferDebugElement = findElement(fixture, '[data-test="productsSlider"]');
      expect(productsOfferDebugElement.nativeElement.products).toEqual(mockProductsData);
    });

    it('should pass isLoading to products slider component', () => {
      component['isLoading'] = true;
      fixture.detectChanges();
      const productsOfferDebugElement = findElement(fixture, '[data-test="productsSlider"]');
      expect(productsOfferDebugElement.nativeElement.isLoading).toBe(true);
    });

    it('should call addToCart with cart item if emit emitAddToCart', () => {
      const productsOfferDebugElement = findElement(fixture, '[data-test="productsSlider"]');
      component['addToCart'] = jasmine.createSpy();
      productsOfferDebugElement.triggerEventHandler('emitAddToCart', {
        product: getMockProduct(),
        count: 2
      });
      expect(component['addToCart']).toHaveBeenCalledWith({ product: getMockProduct(), count: 2 });
    });
  });
});
