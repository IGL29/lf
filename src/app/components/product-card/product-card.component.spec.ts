import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { getMockProduct } from '__tests__/mocks/data/product';
import { ProductBadgeColorPipe } from 'src/app/pipes/product-badge-color/product-badge-color.pipe';
import { ProductBadgeTextPipe } from 'src/app/pipes/product-badge-text/product-badge-text.pipe';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCardComponent, ProductBadgeColorPipe, ProductBadgeTextPipe],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = getMockProduct({ id: 1 });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
