import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeComponent } from './badge.component';
import { findElement } from '__tests__/utils/findElement';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(BadgeComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    });
    await TestBed.configureTestingModule({
      declarations: [BadgeComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render text', () => {
    component.text = 'some text';
    fixture.detectChanges();
    const textParagraph = findElement(fixture, '[data-test="text"]');
    expect(textParagraph).toBeTruthy();
    expect(textParagraph.nativeElement.textContent).toBe('some text');
  });

  it('should not add css classes if not passed bgColor prop', () => {
    component.bgColor = null;
    fixture.detectChanges();
    const textParagraph = findElement(fixture, '[data-test="badge"]');
    expect(textParagraph.nativeElement.classList.contains('badge--pink')).toBeFalsy();
    expect(textParagraph.nativeElement.classList.contains('badge--green')).toBeFalsy();
  });

  it('should set badge--pink css class', () => {
    component.bgColor = 'pink';
    fixture.detectChanges();
    const textParagraph = findElement(fixture, '[data-test="badge"]');
    expect(textParagraph.nativeElement.classList.contains('badge--pink')).toBeTrue();
  });

  it('should set badge--green css class', () => {
    component.bgColor = 'green';
    fixture.detectChanges();
    const textParagraph = findElement(fixture, '[data-test="badge"]');
    expect(textParagraph.nativeElement.classList.contains('badge--green')).toBeTrue();
  });
});
