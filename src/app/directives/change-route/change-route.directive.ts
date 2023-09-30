import { Directive, EventEmitter, OnDestroy, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, filter } from 'rxjs';

@Directive({
  selector: '[appChangeRoute]'
})
export class ChangeRouteDirective implements OnDestroy {
  private destroySubscribtions: Subject<null> = new Subject();

  @Output() appChangeRoute: EventEmitter<undefined> = new EventEmitter();

  constructor(private router: Router) {
    this.subscribeToRouterEvents();
  }

  private subscribeToRouterEvents(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe({
      next: () => this.appChangeRoute.emit()
    });
  }

  ngOnDestroy(): void {
    this.destroySubscribtions.next(null);
    this.destroySubscribtions.complete();
  }
}
