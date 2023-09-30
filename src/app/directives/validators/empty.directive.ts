import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { empty } from 'src/app/validators/empty.validator';

@Directive({
  selector: '[appEmpty]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmptyDirective,
      multi: true
    }
  ]
})
export class EmptyDirective implements Validator {
  validate(control: AbstractControl<string>): ValidationErrors | null {
    return empty(control);
  }
}
