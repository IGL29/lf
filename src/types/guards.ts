import { FormGroup } from '@angular/forms';

export function isNonNull<T>(value: T): value is NonNullable<T> {
  return value !== null;
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object';
}

export function isArray(value: unknown): value is Array<unknown> {
  return Array.isArray(value);
}

export function isFormGroup(formGroup: unknown): formGroup is FormGroup {
  return formGroup instanceof FormGroup;
}
