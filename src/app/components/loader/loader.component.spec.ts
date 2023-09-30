import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { findElement } from '__tests__/utils/findElement';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(LoaderComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    });
    await TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default text is "Загрузка" to loader element', () => {
    fixture.detectChanges();
    const textElement = findElement(fixture, '[data-test="loaderText"]');
    expect(textElement.nativeElement.textContent).toContain('Загрузка');
  });

  it('should set text to loader element', () => {
    component.text = 'Custom text';
    fixture.detectChanges();
    const textElement = findElement(fixture, '[data-test="loaderText"]');
    expect(textElement.nativeElement.textContent).toContain('Custom text');
  });
});
