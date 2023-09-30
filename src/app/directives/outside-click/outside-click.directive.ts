import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appOutsideClick]'
})
export class OutsideClickDirective {
  @Output() appOutsideClick: EventEmitter<void> = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  get host() {
    return this.elementRef.nativeElement;
  }

  @HostListener('document:click', ['$event.target'])
  handlerFocusout(target: HTMLElement) {
    if (!this.host.contains(target)) {
      this.appOutsideClick.emit();
    }
  }
}
