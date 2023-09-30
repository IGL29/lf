import { TestBed } from '@angular/core/testing';

import { IViewportSizes, ViewportSizeService } from './viewport-size.service';
import { Observable } from 'rxjs';
import { WINDOW_TOKEN } from 'src/app/tokens/window';
import { mockWindow } from '__tests__/mocks/browserApi/window';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { IS_PLATFORM_BROWSER_TOKEN } from 'src/app/tokens/isPlatformBrowser';

describe('ViewportSizeService', () => {
  let service: ViewportSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: WINDOW_TOKEN,
          useFactory: () => mockWindow
        },
        {
          provide: PLATFORM_ID,
          useValue: 'platformId'
        },
        {
          provide: IS_PLATFORM_BROWSER_TOKEN,
          useValue: (id: string) => false
        }
      ]
    });
    service = TestBed.inject(ViewportSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return object with sizes from event', () => {
    const sizes: IViewportSizes = { width: 100, height: 50 };
    const resizeEvent = { target: { innerWidth: 100, innerHeight: 50 } };
    expect(service['getSizesFromResizeEvent'](<any>resizeEvent)).toEqual(sizes);
  });

  it('should return stream', () => {
    expect(service.resizeObservable$ instanceof Observable).toBeTrue();
  });
});
