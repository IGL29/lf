import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchingResultsContainerComponent } from './searching-results-container.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mockActivatedRoute } from '__tests__/mocks/services/ActivatedRoute';
import { ProductsService } from 'src/app/services/products/products.service';
import { mockProductsService } from '__tests__/mocks/services/ProductsService';
import { ProductsFilterService } from 'src/app/services/products-filter/products-filter.service';
import { mockProductsFilterService } from '__tests__/mocks/services/ProductsFilterService';

describe('SearchingResultsComponent', () => {
  let component: SearchingResultsContainerComponent;
  let fixture: ComponentFixture<SearchingResultsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchingResultsContainerComponent],
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
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchingResultsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
