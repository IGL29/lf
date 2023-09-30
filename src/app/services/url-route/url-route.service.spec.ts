import { TestBed } from '@angular/core/testing';

import { UrlRouteService } from './url-route.service';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { mockActivatedRoute } from '__tests__/mocks/services/ActivatedRoute';
import { mockUrlRouterService } from '__tests__/mocks/services/UrlRouterService';
import { BehaviorSubject, Subject, take } from 'rxjs';

describe('UrlRouteService', () => {
  let service: UrlRouteService;

  beforeEach(() => {
    mockUrlRouterService['events'] = new Subject();
    mockActivatedRoute['queryParams'] = new BehaviorSubject({});

    TestBed.configureTestingModule({
      providers: [
        UrlRouteService,
        {
          provide: Router,
          useValue: mockUrlRouterService
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        }
      ]
    });

    service = TestBed.inject(UrlRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return previousUrlStream', () => {
    expect(service.previousUrlStream$).toEqual(service['_previousUrlStream$']);
  });

  it('should return currentUrlStream', () => {
    expect(service.currentUrlStream$).toEqual(service['_currentUrlStream$']);
  });

  it('should return isChangedUrlStream', () => {
    expect(service.isChangedUrlStream$).toEqual(service['_isChangedUrlStream$']);
  });

  it('should return previous url from stream when passed value to router.events or activatedRoute.queryParams streams', (done) => {
    mockUrlRouterService['events'].next(new NavigationEnd(2, '/catalog', '/catalog'));
    mockActivatedRoute['queryParams'].next({ color: 'red' });

    mockUrlRouterService['events'].next(new NavigationEnd(1, '/', '/'));

    service.previousUrlStream$.pipe(take(1)).subscribe((prevUrl) => {
      expect(prevUrl).toEqual({ url: '/catalog', urlFull: '/catalog', params: { color: 'red' } });
      done();
    });
  });

  it('should return current url from stream when passed value to router.events or activatedRoute.queryParams streams', (done) => {
    mockActivatedRoute['queryParams'].next({});
    mockUrlRouterService['events'].next(new NavigationEnd(1, '/catalog', '/catalog'));

    service.currentUrlStream$.pipe(take(1)).subscribe((currentUrl) => {
      expect(currentUrl).toEqual({ url: '/catalog', urlFull: '/catalog', params: {} });
      done();
    });
  });
});
