import { Directive, DoCheck, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImageUploadStatus]',
  exportAs: 'appImageUploadStatus'
})
export class ImageUploadStatusDirective implements DoCheck {
  private elementWithSettedClass: HTMLElement | null;
  @Input() classNameLoading = 'image-loading';
  @Input() otherTargetForOutput: HTMLElement;

  constructor(private elRef: ElementRef) {}

  ngDoCheck(): void {
    if (!this.elRef.nativeElement.complete && !this.elementWithSettedClass) {
      const targetForStatusOutput = this.otherTargetForOutput || this.elRef.nativeElement;
      targetForStatusOutput.classList.add(this.classNameLoading);
      this.elementWithSettedClass = targetForStatusOutput;
    }
  }

  @HostListener('load')
  private handlerOnLoad(): void {
    if (!this.elementWithSettedClass) {
      return;
    }
    this.elementWithSettedClass.classList.remove(this.classNameLoading);
    this.elementWithSettedClass = null;
  }
}
