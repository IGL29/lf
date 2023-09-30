import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appOutsideFocus]'
})
export class OutsideFocusDirective {
  @Output() appOutsideFocus: EventEmitter<void> = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  get host() {
    return this.elementRef.nativeElement;
  }

  @HostListener('document:focusin', ['$event.target'])
  handlerFocusout(target: HTMLElement) {
    if (!this.host.contains(target)) {
      this.appOutsideFocus.emit();
    }
  }
}
