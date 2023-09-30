import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Directive({
  selector: '[appIntersection]'
})
export class IntersectionDirective {
  private observer: IntersectionObserver;
  @Input() rootMargin = '100';
  @Output() appIntersection = new EventEmitter<boolean>();

  constructor(public elRef: ElementRef) {
    this.observer = new IntersectionObserver(this.callback, {
      rootMargin: `${this.rootMargin}px`,
      threshold: 0.5,
      root: null
    });
    this.observer.observe(this.elRef.nativeElement);
  }

  private callback: ConstructorParameters<typeof IntersectionObserver>[0] = (entries) =>
    entries
      .filter((entry) => entry.isIntersecting)
      .forEach((entry) => {
        const rootBounds = entry.rootBounds;
        if (!rootBounds) {
          return;
        }
        const isAbove = entry.boundingClientRect.y < entry.rootBounds.y;
        this.appIntersection.emit(isAbove);
      });
}
