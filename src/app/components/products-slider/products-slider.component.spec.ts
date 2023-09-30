import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSliderComponent } from './products-slider.component';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { findElement } from '__tests__/utils/findElement';
import { getMockProduct } from '__tests__/mocks/data/product';
import { ViewportSizeService } from 'src/app/services/events/resize/viewport-size.service';
import {
  getMockViewportSizeService,
  mockViewportSizeService
} from '__tests__/mocks/services/ViewportSizeService';
import { BehaviorSubject } from 'rxjs';

describe('ProductsOfferSliderComponent', () => {
  let component: ProductsSliderComponent;
  let fixture: ComponentFixture<ProductsSliderComponent>;
  let mockViewportSizeService: mockViewportSizeService;

  beforeEach(async () => {
    TestBed.overrideComponent(ProductsSliderComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    });
    await TestBed.configureTestingModule({
      declarations: [ProductsSliderComponent],
      providers: [
        {
          provide: ViewportSizeService,
          useValue: getMockViewportSizeService()
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsSliderComponent);
    component = fixture.componentInstance;
    mockViewportSizeService = TestBed.inject(ViewportSizeService);
    mockViewportSizeService['resizeObservable$'] = new BehaviorSubject({ width: 1000 });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loader if products is loading', () => {
    component.isLoading = true;
    fixture.detectChanges();
    const loadingDebugElement = findElement(fixture, '[data-test="loader"]');
    expect(loadingDebugElement).toBeTruthy();
  });

  it('should hide loader and slider if products empty', () => {
    component.isLoading = false;
    component.products = [];
    fixture.detectChanges();
    const loadingDebugElement = findElement(fixture, '[data-test="loader"]');
    const sliderDebugElement = findElement(fixture, '[data-test="slider"]');
    expect(loadingDebugElement).not.toBeTruthy();
    expect(sliderDebugElement).not.toBeTruthy();
  });

  it('should show slider if products not empty', () => {
    component.products = [getMockProduct()];
    fixture.detectChanges();
    const sliderDebugElement = findElement(fixture, '[data-test="slider"]');
    expect(sliderDebugElement).toBeTruthy();
  });

  it('should call emitAddToCart.emit with product and count if click on button in product card', () => {
    component.products = [getMockProduct({ id: 1 }), getMockProduct({ id: 2 })];
    fixture.detectChanges();
    spyOn(component.emitAddToCart, 'emit');
    const btnAddToCartDebugElement = findElement(fixture, '[data-test="btnAddToCart"]');
    btnAddToCartDebugElement.triggerEventHandler('click');
    expect(component.emitAddToCart.emit).toHaveBeenCalledWith({
      product: getMockProduct({ id: 1 }),
      count: 1
    });
  });

  it('should set 3 to countVisibleSlides if getted viewport with less 992', () => {
    mockViewportSizeService['resizeObservable$'].next({ width: 991 });
    expect(component['countVisibleSlides']).toBe(3);
  });

  it('should set 4 to countVisibleSlides if getted viewport with more 991', () => {
    mockViewportSizeService['resizeObservable$'].next({ width: 992 });
    expect(component['countVisibleSlides']).toBe(4);
  });

  it('should unsubscribe', () => {
    component['countVisibleSlides'] = 0;
    component.ngOnDestroy();
    mockViewportSizeService['resizeObservable$'].next({ width: 992 });
    expect(component['countVisibleSlides']).toBe(0);
  });
});
