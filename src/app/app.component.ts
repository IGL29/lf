import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { AppService } from './services/app/app.service';
import { DestroyerSubscriptionsService } from './services/events/destroyer-subscriptions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  protected isMainRoute: boolean;

  constructor(
    private cdr: ChangeDetectorRef,
    private dss: DestroyerSubscriptionsService,
    private appService: AppService
  ) {
    appService.startApp();
  }

  ngOnInit(): void {
    this.appService.subscribeToScrollTop();
    this.subscribeToIsMainRoute();
  }

  ngOnDestroy(): void {
    this.appService.unsubscribe();
    this.dss.destroyAll();
  }

  private subscribeToIsMainRoute(): void {
    this.appService.currentUrl$.subscribe((currentUrlInfo) => {
      this.isMainRoute = this.appService.isMainRouteCheck(currentUrlInfo.url);
      this.cdr.markForCheck();
    });
  }
}
