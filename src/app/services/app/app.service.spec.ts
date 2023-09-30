import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import { StoreService } from '../store/store.service';
import { mockStoreService } from '__tests__/mocks/services/StoreService';
import { mainRoute } from '~data/routes';
import { UrlRouteService } from '../url-route/url-route.service';
import { mockUrlRouteService } from '__tests__/mocks/services/UrlRouteService';
import { mockWindow } from '__tests__/mocks/browserApi/window';
import { WINDOW_TOKEN } from 'src/app/tokens/window';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StoreService,
          useValue: mockStoreService
        },
        {
          provide: UrlRouteService,
          useValue: mockUrlRouteService
        },
        {
          provide: WINDOW_TOKEN,
          useValue: mockWindow
        }
      ]
    });
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call StoreService.dispatchStartAction', () => {
    service.startApp();
    expect(mockStoreService.dispatchStartAction).toBeTruthy();
  });

  it('should return true if getted url is main page', () => {
    expect(service.isMainRouteCheck(mainRoute.url)).toBeTrue();
  });

  it('should call window.scrollTo with top 0 if getted true from isChangedUrlStream$', () => {
    mockWindow['scrollTo'] = jasmine.createSpy();
    service.subscribeToScrollTop();
    mockUrlRouteService['isChangedUrlStream$'].next(true);
    expect(mockWindow['scrollTo']).toHaveBeenCalledWith({ top: 0 });
  });

  it('should not call window.scrollTo if getted false from isChangedUrlStream$', () => {
    mockWindow['scrollTo'] = jasmine.createSpy();
    service.subscribeToScrollTop();
    mockUrlRouteService['isChangedUrlStream$'].next(false);
    expect(mockWindow['scrollTo']).not.toHaveBeenCalled();
  });

  it('should return currentUrl stream', (done) => {
    service['currentUrl$'].subscribe((value) => {
      expect(value).toEqual({ url: '/', urlFull: '/?full="true"', params: {} });
      done();
    });
    mockUrlRouteService['currentUrlStream$'].next({
      url: '/',
      urlFull: '/?full="true"',
      params: {}
    });
  });

  it('should unsubscribe from currentUrlStream$', () => {
    const subscription = service['currentUrl$'].subscribe();
    service['unsubscribe']();
    expect(subscription.closed).toBeTruthy();
  });

  it('should unsubscribe from isChangedUrlStream$', () => {
    service['observerChangeUrl'] = jasmine.createSpy();
    spyOnProperty(service, 'currentUrl$');
    mockUrlRouteService['isChangedUrlStream$'].next('new');
    expect(service['observerChangeUrl']).not.toHaveBeenCalled();
  });
});
