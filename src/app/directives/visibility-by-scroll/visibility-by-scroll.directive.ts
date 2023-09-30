import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Scroll } from '@angular/router';
import { Observable, Subject, asyncScheduler, takeUntil, throttleTime } from 'rxjs';
import { ScrollEventService } from 'src/app/services/events/scroll/scroll-event.service';
import { WINDOW_TOKEN } from 'src/app/tokens/window';

type Action = 'hidden' | 'visible';

@Directive({
  selector: '[appVisibilityByScroll]',
  exportAs: 'appVisibilityByScroll'
})
export class VisibilityByScrollDirective implements OnInit, AfterViewInit, OnDestroy {
  private destroySubject: Subject<null> = new Subject();
  private prevScroll: number;
  private currentScroll: number;
  private scrollObservable$: Observable<Scroll>;
  private isVisibleHost = true;
  @Input() inactionTop = 0;
  @Output() emitIsOnMove: EventEmitter<boolean>;

  get host(): HTMLElement {
    return this.elRef.nativeElement;
  }

  constructor(
    @Inject(WINDOW_TOKEN) private window: Window,
    private elRef: ElementRef<HTMLElement>,
    private scrollService: ScrollEventService
  ) {
    this.emitIsOnMove = new EventEmitter();
    this.scrollObservable$ = this.scrollService.scrollObservable$;
    this.currentScroll = this.getPageYOffset();
  }

  ngOnInit(): void {
    this.subscribeToScroll();
  }

  ngAfterViewInit(): void {
    this.setPreporatoryStyles();
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  private subscribeToScroll() {
    this.scrollObservable$
      .pipe(takeUntil(this.destroySubject), throttleTime(400, asyncScheduler, { trailing: true }))
      .subscribe(() => {
        this.switchVisible();
      });
  }

  private setPreporatoryStyles() {
    this.host.style.setProperty('position', 'sticky');
    this.host.style.setProperty('transition', 'transform 0.2s');
    this.host.style.setProperty('transform', 'translateY(0)');
  }

  private switchVisible(): void {
    this.currentScroll = this.getPageYOffset();

    if (this.currentScroll <= this.inactionTop) {
      this.changeVisibility('visible');
      this.emitIsOnMove.emit(false);
      return;
    }
    if (this.currentScroll > this.prevScroll && this.isVisibleHost) {
      this.changeVisibility('hidden');
      this.emitIsOnMove.emit(true);
    }
    if (this.currentScroll < this.prevScroll && this.isVisibleHost) {
      this.changeVisibility('visible');
      this.emitIsOnMove.emit(true);
    }

    this.prevScroll = this.currentScroll;
  }

  private changeVisibility(action: Action): void {
    if (action === 'hidden') {
      this.host.style.setProperty('transform', 'translateY(-100%)');
      return;
    }
    this.host.style.setProperty('transform', 'translateY(0)');
  }

  private getPageYOffset(): number {
    return this.window.scrollY;
  }
}
