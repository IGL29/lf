import { AbstractControl, ValidationErrors } from '@angular/forms';

export function empty(control: AbstractControl): ValidationErrors | null {
  return control.value && control.value.trim() ? null : { empty: true };
}
