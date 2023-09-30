import { Inject, Injectable } from '@angular/core';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { UrlRouteService } from '../url-route/url-route.service';
import { mainRoute } from '~data/routes';
import { IRouteInfo } from '../url-route/types';
import { WINDOW_TOKEN } from 'src/app/tokens/window';
import { StoreService } from '../store/store.service';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  private destroySubject = new Subject<null>();

  constructor(
    @Inject(WINDOW_TOKEN) private window: Window,
    private urlRoute: UrlRouteService,
    private storeService: StoreService
  ) {}

  public startApp() {
    this.storeService.dispatchStartAction();
  }

  public subscribeToScrollTop(): Subscription {
    return this.urlRoute.isChangedUrlStream$
      .pipe(takeUntil(this.destroySubject))
      .subscribe((isChanged) => this.observerChangeUrl(isChanged));
  }

  get currentUrl$(): Observable<IRouteInfo> {
    return this.urlRoute.currentUrlStream$.pipe(takeUntil(this.destroySubject));
  }

  public unsubscribe(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  private observerChangeUrl(isChanged: boolean): void {
    if (!isChanged) {
      return;
    }
    this.window.scrollTo({ top: 0 });
  }

  public isMainRouteCheck(url: string | null): boolean {
    return url === mainRoute.url;
  }
}
