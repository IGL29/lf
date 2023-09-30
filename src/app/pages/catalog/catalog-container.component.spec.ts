import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogContainerComponent } from './catalog-container.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mockActivatedRoute } from '__tests__/mocks/services/ActivatedRoute';
import { ProductsService } from 'src/app/services/products/products.service';
import { mockProductsService } from '__tests__/mocks/services/ProductsService';
import { ProductsFilterService } from 'src/app/services/products-filter/products-filter.service';
import { mockProductsFilterService } from '__tests__/mocks/services/ProductsFilterService';
import { ProductsSortingService } from 'src/app/services/products-sorting/products-sorting.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { mockCartService } from '__tests__/mocks/services/CartService';
import { mockProductsSortingService } from '__tests__/mocks/services/ProductsSortingService';

describe('CatalogContainerComponent', () => {
  let component: CatalogContainerComponent;
  let fixture: ComponentFixture<CatalogContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogContainerComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
        {
          provide: ProductsService,
          useValue: mockProductsService
        },
        {
          provide: ProductsFilterService,
          useValue: mockProductsFilterService
        },
        {
          provide: ProductsSortingService,
          useValue: mockProductsSortingService
        },
        {
          provide: CartService,
          useValue: mockCartService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogContainerComponent);
    component = fixture.componentInstance;
    component['subscribeToProducts'] = jasmine.createSpy();
    component['subscribeToProductsLoading'] = jasmine.createSpy();
    component['subscribeToProductsError'] = jasmine.createSpy();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
