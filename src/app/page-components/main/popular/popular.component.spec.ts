import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularComponent } from './popular.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { mockProductsService } from '__tests__/mocks/services/ProductsService';
import { ViewportSizeService } from 'src/app/services/events/resize/viewport-size.service';
import {
  getMockViewportSizeService,
  mockViewportSizeService
} from '__tests__/mocks/services/ViewportSizeService';
import { GetWordPipe } from 'src/app/pipes/get-word/get-word.pipe';

describe('PopularComponent', () => {
  let component: PopularComponent;
  let fixture: ComponentFixture<PopularComponent>;
  let mockViewportSizeService: mockViewportSizeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopularComponent, GetWordPipe],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService
        },
        {
          provide: ViewportSizeService,
          useValue: getMockViewportSizeService()
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PopularComponent);
    component = fixture.componentInstance;
    component['subscribeToViewportSize'] = jasmine.createSpy();
    component['subscribeToProducts'] = jasmine.createSpy();
    component['subscribeToProductsLoading'] = jasmine.createSpy();
    mockViewportSizeService = TestBed.inject(ViewportSizeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
