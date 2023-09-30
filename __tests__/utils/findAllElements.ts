import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export const findAllElements = <T>(fixture: ComponentFixture<T>, selector: string) =>
  fixture.debugElement.queryAll(By.css(selector));
