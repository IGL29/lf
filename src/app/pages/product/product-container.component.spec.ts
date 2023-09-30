import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductContainerComponent } from './product-container.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mockActivatedRoute } from '__tests__/mocks/services/ActivatedRoute';
import { ProductContainerService } from 'src/app/services/product-container/product-container.service';
import { mockProductContainerService } from '__tests__/mocks/services/ProductContainerService';
import { ViewportSizeService } from 'src/app/services/events/resize/viewport-size.service';
import {
  getMockViewportSizeService,
  mockViewportSizeService
} from '__tests__/mocks/services/ViewportSizeService';
import { HydrationStoreService } from 'src/app/services/hydration-store.service';
import { mockHydrationStoreService } from '__tests__/mocks/services/HydrationStoreService';

describe('ProductContainerComponent', () => {
  let component: ProductContainerComponent;
  let fixture: ComponentFixture<ProductContainerComponent>;
  let mockViewportSizeService: mockViewportSizeService;

  beforeEach(async () => {
    mockHydrationStoreService['isPlatformBrowser'] = false;

    await TestBed.configureTestingModule({
      declarations: [ProductContainerComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
        {
          provide: ProductContainerService,
          useValue: mockProductContainerService
        },
        {
          provide: ViewportSizeService,
          useValue: getMockViewportSizeService()
        },
        {
          provide: HydrationStoreService,
          useValue: mockHydrationStoreService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductContainerComponent);
    component = fixture.componentInstance;
    component['subscribeToProduct'] = jasmine.createSpy();
    component['subscribeToRouteData'] = jasmine.createSpy();
    component['subscribeToViewportSizes'] = jasmine.createSpy();
    mockViewportSizeService = TestBed.inject(ViewportSizeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
