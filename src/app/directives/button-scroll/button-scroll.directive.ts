import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnDestroy
} from '@angular/core';
import { Subject, asyncScheduler, takeUntil, throttleTime } from 'rxjs';
import { ScrollEventService } from 'src/app/services/events/scroll/scroll-event.service';
import { WINDOW_TOKEN } from 'src/app/tokens/window';

@Directive({
  selector: '[appButtonScroll]'
})
export class ButtonScrollDirective implements AfterViewInit, OnDestroy {
  private destroySubject: Subject<null> = new Subject();
  private scrollY: number;
  @Input() positionTop = 0;

  constructor(
    @Inject(WINDOW_TOKEN) private window: Window,
    private scrollEventService: ScrollEventService,
    private elRef: ElementRef<HTMLElement>
  ) {}

  ngAfterViewInit(): void {
    this.subscribeToScrollEvent();
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  private get host(): HTMLElement {
    return this.elRef.nativeElement;
  }

  private subscribeToScrollEvent() {
    this.scrollEventService.scrollObservable$
      .pipe(takeUntil(this.destroySubject), throttleTime(700, asyncScheduler, { trailing: true }))
      .subscribe(() => {
        this.scrollY = this.window.scrollY;
        this.switchVisibility();
      });
  }

  private switchVisibility() {
    if (this.scrollY && this.scrollY > 500) {
      this.host.classList.add('btn-scroll--active');
      return;
    }
    this.host.classList.remove('btn-scroll--active');
  }

  @HostListener('click')
  handlerScroll() {
    this.window.scrollTo({ top: this.positionTop, behavior: 'smooth' });
  }
}
