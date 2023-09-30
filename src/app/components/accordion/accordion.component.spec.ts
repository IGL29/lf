import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionComponent } from './accordion.component';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy } from '@angular/core';
import { findElement } from '__tests__/utils/findElement';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(AccordionComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    });

    await TestBed.configureTestingModule({
      declarations: [AccordionComponent],
      imports: [BrowserAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set _open value', () => {
    component.isOpen = true;
    expect(component['_isOpen']).toBeTrue();
  });

  it('should get _isOpen value', () => {
    component['_isOpen'] = true;
    expect(component.isOpen).toBeTrue();
  });

  it('should change isOpen value on true', () => {
    component.switchContentVisible(true);
    expect(component.isOpen).toBeTrue();
  });

  it('should change isOpen value on false', () => {
    component.switchContentVisible(false);
    expect(component.isOpen).toBeFalse();
  });

  it('should change isOpen value on reverse value', () => {
    component.isOpen = true;
    component.switchContentVisible();
    expect(component.isOpen).toBeFalse();
  });

  it('should call switchContentVisible by click', () => {
    const wrapperButton = findElement(fixture, '[data-test="wrapper-button"]');
    spyOn(component, 'switchContentVisible');
    wrapperButton.triggerEventHandler('click');
    expect(component.switchContentVisible).toHaveBeenCalled();
  });

  it('should hide wrapper content', () => {
    component.isOpen = false;
    fixture.detectChanges();
    const wrapperContent = findElement(fixture, '[data-test="wrapper-content"]');
    expect(wrapperContent).toBeFalsy();
  });

  it('should visible wrapper content', () => {
    component.isOpen = true;
    fixture.detectChanges();
    const wrapperContent = fixture.debugElement.query(By.css('[data-test="wrapper-content"]'));
    expect(wrapperContent).toBeTruthy();
  });
});
