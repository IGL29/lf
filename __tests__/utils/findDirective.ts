import { Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export const findDirective = <T, U>(fixture: ComponentFixture<T>, directive: Type<U>): U =>
  fixture.debugElement.query(By.directive(directive)).injector.get(directive);
