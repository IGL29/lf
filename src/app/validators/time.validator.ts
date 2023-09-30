import { AbstractControl, ValidationErrors } from '@angular/forms';

export function time(control: AbstractControl): ValidationErrors | null {
  return control.value &&
    control.value.trim() &&
    control.value.match(/([01][0-9]|2[0-3])([0-5][0-9])/)
    ? null
    : { time: true };
}
