import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogComponent } from './catalog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { WINDOW_TOKEN } from 'src/app/tokens/window';
import { mockWindow } from '__tests__/mocks/browserApi/window';
import { ViewportSizeService } from 'src/app/services/events/resize/viewport-size.service';
import {
  getMockViewportSizeService,
  mockViewportSizeService
} from '__tests__/mocks/services/ViewportSizeService';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let vss: mockViewportSizeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: WINDOW_TOKEN,
          useFactory: () => mockWindow
        },
        {
          provide: ViewportSizeService,
          useValue: getMockViewportSizeService()
        }
      ],
      declarations: [CatalogComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    vss = TestBed.inject(ViewportSizeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true if viewport width less 769', () => {
    vss['resizeObservable$'].next({ width: 768 });
    fixture.whenStable();
    expect(component.isMobile).toBeTruthy();
  });
});
