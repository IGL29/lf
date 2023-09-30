import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceComponent } from './price.component';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { findElement } from '__tests__/utils/findElement';

describe('PriceComponent', () => {
  let component: PriceComponent;
  let fixture: ComponentFixture<PriceComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(PriceComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    });
    await TestBed.configureTestingModule({
      declarations: [PriceComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render current price without discount', () => {
    component.price = { value: 1000, discount: 0 };
    fixture.detectChanges();
    const discountPriceDebugElement = findElement(fixture, '[data-test="priceDiscount"]');
    expect(discountPriceDebugElement).not.toBeTruthy();
  });

  it('should render discount price', () => {
    component.price = { value: 1000, discount: 50 };
    fixture.detectChanges();
    const discountPriceDebugElement = findElement(fixture, '[data-test="priceDiscount"]');
    expect(discountPriceDebugElement).toBeTruthy();
  });
});
