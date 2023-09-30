import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogComponent } from './catalog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ViewportSizeService } from 'src/app/services/events/resize/viewport-size.service';
import {
  getMockViewportSizeService,
  mockViewportSizeService
} from '__tests__/mocks/services/ViewportSizeService';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let mockViewportSizeService: mockViewportSizeService;

  TestBed.overrideComponent(CatalogComponent, {
    set: {
      providers: [
        {
          provide: ViewportSizeService,
          useValue: getMockViewportSizeService()
        }
      ]
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
