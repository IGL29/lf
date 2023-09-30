import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

const buttonVariantClasses = <const>{
  '1': 'button-1',
  '2': 'button-2',
  '3': 'button-3',
  '4': 'button-4'
};

export type ButtonVariant = keyof typeof buttonVariantClasses;

@Directive({
  selector: 'button[appUiButton], a[appUiButton]'
})
export class UiButtonDirective implements OnInit {
  private buttonVariantClasses = buttonVariantClasses;
  private _variant: ButtonVariant;
  private defaultVariant = <const>'1';

  @Input('appUiButton')
  set variant(value: ButtonVariant | '') {
    this._variant =
      value !== '' && value in this.buttonVariantClasses ? value : this.defaultVariant;
  }

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.initButton();
  }

  private get host() {
    return this.elRef.nativeElement;
  }

  private initButton() {
    this.renderer.addClass(this.host, this.buttonVariantClasses[this._variant]);
  }
}
