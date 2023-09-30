import { TestBed } from '@angular/core/testing';

import { HydrationStoreService } from './hydration-store.service';
import { TransferState } from '@angular/platform-browser';
import { mockTransferState } from '__tests__/mocks/services/TransferState';
import { PLATFORM_ID } from '@angular/core';
import { StoreService } from './store/store.service';
import { mockStoreService } from '__tests__/mocks/services/StoreService';
import { isPlatformBrowser } from '@angular/common';
import { IS_PLATFORM_SERVER_TOKEN } from '../tokens/isPlatformServer';
import { IS_PLATFORM_BROWSER_TOKEN } from '../tokens/isPlatformBrowser';
import { mockHydrationStoreService } from '__tests__/mocks/services/HydrationStoreService';

describe('HydrationStoreService', () => {
  let service: HydrationStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TransferState,
          useValue: mockTransferState
        },
        {
          provide: PLATFORM_ID,
          useValue: 'platformId'
        },
        {
          provide: StoreService,
          useValue: mockStoreService
        },
        {
          provide: IS_PLATFORM_SERVER_TOKEN,
          useValue: (id: string) => false
        },
        {
          provide: IS_PLATFORM_BROWSER_TOKEN,
          useValue: (id: string) => true
        }
      ]
    });
    service = TestBed.inject(HydrationStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
