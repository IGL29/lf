import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestHostComponent } from './test-host.component';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { findElement } from '__tests__/utils/findElement';
import { AccordionComponent } from '../accordion.component';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('AccordionComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(TestHostComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    });

    TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [provideAnimations()],
      declarations: [TestHostComponent, AccordionComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render button passed to <ng-content>', () => {
    const buttonContent = findElement(fixture, '[data-test="button-content"]');
    expect(buttonContent).toBeTruthy();
  });

  it('should render content passed to <ng-content>', () => {
    const accordion = fixture.debugElement.query(
      By.directive(AccordionComponent)
    ).componentInstance;
    accordion.isOpen = true;
    fixture.detectChanges();
    const content = findElement(fixture, '[data-test="content"]');
    expect(content).toBeTruthy();
  });
});
