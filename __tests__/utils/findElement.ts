import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export const findElement = <T>(fixture: ComponentFixture<T>, selector: string) =>
  fixture.debugElement.query(By.css(selector));
