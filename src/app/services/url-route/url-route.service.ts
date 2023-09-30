import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, filter } from 'rxjs';
import { IRouteInfo } from './types';
@Injectable({
  providedIn: 'root'
})
export class UrlRouteService {
  private _previousUrlSubject = new BehaviorSubject<IRouteInfo>(this.createRouteInfo());
  private _previousUrlStream$ = this._previousUrlSubject.asObservable();
  private _currentUrlSubject = new BehaviorSubject<IRouteInfo>(this.createRouteInfo());
  private _currentUrlStream$ = this._currentUrlSubject.asObservable();
  private _isChangedUrlSubject = new BehaviorSubject<boolean>(false);
  private _isChangedUrlStream$ = this._isChangedUrlSubject.asObservable();
  private previousUrl: null | string = null;
  private previousParams: null | Params = null;
  private previousUrlFull: null | string = null;
  private currentUrl: null | string = null;
  private currentParams: null | Params = null;
  private currentUrlFull: null | string = null;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.subscribeToRouterEvents();
  }

  private subscribeToRouterEvents() {
    combineLatest([this.router.events, this.activatedRoute.queryParams])
      .pipe(filter(([event]) => event instanceof NavigationEnd))
      .subscribe(([event, queryParams]) => {
        if (event instanceof NavigationEnd) {
          this.previousUrl = this.currentUrl;
          this.previousParams = this.currentParams;
          this.previousUrlFull = this.currentUrlFull;

          this.currentUrl = event.url.split('?')[0];
          this.currentParams = queryParams;
          this.currentUrlFull = event.url;

          this.notifySubscribers();
          this.checkOnChanged(this.previousUrl, this.currentUrl);
        }
      });
  }

  private notifySubscribers(): void {
    this._previousUrlSubject.next(
      this.createRouteInfo(this.previousUrl, this.previousUrlFull, this.previousParams)
    );
    this._currentUrlSubject.next(
      this.createRouteInfo(this.currentUrl, this.currentUrlFull, this.currentParams)
    );
  }

  private createRouteInfo(
    url: IRouteInfo['url'] = null,
    urlFull: IRouteInfo['urlFull'] = null,
    params: IRouteInfo['params'] = null
  ): IRouteInfo {
    return {
      url,
      urlFull,
      params
    };
  }

  private checkOnChanged(prevUrl: null | string, currentUrl: null | string): void {
    const prevUrlWithoutParams = prevUrl && prevUrl.split('?')[0];
    const currentUrlWithoutParams = currentUrl && currentUrl.split('?')[0];
    this._isChangedUrlSubject.next(prevUrlWithoutParams !== currentUrlWithoutParams);
  }

  public get previousUrlStream$(): Observable<IRouteInfo> {
    return this._previousUrlStream$;
  }

  public get currentUrlStream$(): Observable<IRouteInfo> {
    return this._currentUrlStream$;
  }

  public get isChangedUrlStream$(): Observable<boolean> {
    return this._isChangedUrlStream$;
  }
}
