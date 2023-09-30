import { TestBed } from '@angular/core/testing';

import { DestroyerSubscriptionsService } from './destroyer-subscriptions.service';
import { ViewportSizeService } from './resize/viewport-size.service';
import { PointerEventService } from './pointer/pointer-event.service';
import { KeydownEventService } from './keydown/keydown-event.service';
import { ScrollEventService } from './scroll/scroll-event.service';
import { WINDOW_TOKEN } from 'src/app/tokens/window';
import { mockWindow } from '__tests__/mocks/browserApi/window';
import {
  getMockViewportSizeService,
  mockViewportSizeService
} from '__tests__/mocks/services/ViewportSizeService';

describe('DestroyerSubscriptionsService', () => {
  let service: DestroyerSubscriptionsService;
  let vss: ViewportSizeService;
  let pointerEventService: PointerEventService;
  let keydownEventService: KeydownEventService;
  let scrollEventService: ScrollEventService;
  let mockViewportSizeService: mockViewportSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DestroyerSubscriptionsService,
        {
          provide: WINDOW_TOKEN,
          useFactory: () => mockWindow
        },
        {
          provide: ViewportSizeService,
          useValue: getMockViewportSizeService()
        },
        PointerEventService,
        KeydownEventService,
        ScrollEventService
      ]
    });
    service = TestBed.inject(DestroyerSubscriptionsService);
    vss = TestBed.inject(ViewportSizeService);
    pointerEventService = TestBed.inject(PointerEventService);
    keydownEventService = TestBed.inject(KeydownEventService);
    scrollEventService = TestBed.inject(ScrollEventService);
    mockViewportSizeService = TestBed.inject(ViewportSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be called vss.destroy', () => {
    service.destroyAll();
    expect(vss.destroy).toHaveBeenCalled();
  });

  it('should be called keydownEventService.destroy', () => {
    spyOn(keydownEventService, 'destroy');
    service.destroyAll();
    expect(keydownEventService.destroy).toHaveBeenCalled();
  });

  it('should be called pointerEventService.destroy', () => {
    spyOn(pointerEventService, 'destroy');
    service.destroyAll();
    expect(pointerEventService.destroy).toHaveBeenCalled();
  });

  it('should be called scrollEventService.destroy', () => {
    spyOn(scrollEventService, 'destroy');
    service.destroyAll();
    expect(scrollEventService.destroy).toHaveBeenCalled();
  });
});
