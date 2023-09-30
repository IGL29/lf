import { AfterViewInit, Directive, ElementRef, Inject, Input, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil, throttleTime } from 'rxjs';
import {
  IPointerEvent,
  PointerEventService
} from 'src/app/services/events/pointer/pointer-event.service';
import { TargetVariant } from './types';
import { WINDOW_TOKEN } from 'src/app/tokens/window';

interface EventHandlerArgs {
  element: HTMLElement;
  bgOffsetX: number;
  bgOffsetY: number;
  pointerEvent: IPointerEvent;
}

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective implements AfterViewInit, OnDestroy {
  private destroySubject: Subject<null>;
  private durationAnim = 0.5;
  private pointerEvent$: Observable<IPointerEvent>;
  @Input() appParallaxBgOffsetX = 0;
  @Input() appParallaxBgOffsetY = 0;
  @Input() appParallaxTargetVariant: TargetVariant = 'background';
  @Input() appParallaxScale = 1;
  @Input() appParallaxThrottleTime = 100;

  constructor(
    @Inject(WINDOW_TOKEN) private window: Window,
    pointerEventService: PointerEventService,
    private elRef: ElementRef<HTMLElement>
  ) {
    this.destroySubject = new Subject();
    this.pointerEvent$ = pointerEventService.pointermoveObservable$;
  }

  get host(): HTMLElement {
    return this.elRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.setParallax(
      this.host,
      this.appParallaxBgOffsetX,
      this.appParallaxBgOffsetY,
      this.durationAnim
    );
  }

  ngOnDestroy(): void {
    this.pointerEvent$;
  }

  private setParallax(
    element: HTMLElement,
    bgOffsetX: number,
    bgOffsetY: number,
    durationAnim: number = this.durationAnim
  ): void {
    this.setPreparatoryStyles(element, durationAnim);

    this.pointerEvent$
      .pipe(takeUntil(this.destroySubject), throttleTime(this.appParallaxThrottleTime))
      .subscribe((pointerEvent) => {
        this.backgroundMove({ element, bgOffsetX, bgOffsetY, pointerEvent });
      });
  }

  private setPreparatoryStyles(element: HTMLElement, durationAnim: number): void {
    if (this.appParallaxTargetVariant === 'background') {
      element.style.setProperty('transition', `background-position ${durationAnim}s ease-out`);
    }
    if (this.appParallaxTargetVariant === 'img') {
      element.style.setProperty('transition', `transform ${durationAnim}s ease-out`);
    }
  }

  private backgroundMove({ element, bgOffsetX, bgOffsetY, pointerEvent }: EventHandlerArgs) {
    if (pointerEvent.pointerType !== 'mouse') {
      return;
    }
    const offsetX = (pointerEvent.clientX / this.window.innerWidth) * bgOffsetX - bgOffsetX;
    const offsetY = (pointerEvent.clientY / this.window.innerHeight) * bgOffsetY - bgOffsetY;

    if (this.appParallaxTargetVariant === 'background') {
      element.style.setProperty('background-position', `${offsetX}px ${offsetY}px`);
    }
    if (this.appParallaxTargetVariant === 'img') {
      element.style.setProperty(
        'transform',
        `translate(${offsetX}px, ${offsetY}px) scale(${this.appParallaxScale})`
      );
    }
  }
}
