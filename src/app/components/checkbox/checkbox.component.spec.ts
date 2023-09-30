import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { findElement } from '__tests__/utils/findElement';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(CheckboxComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    });
    await TestBed.configureTestingModule({
      declarations: [CheckboxComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('class', () => {
    it('should return check state of checkbox', () => {
      component['_isChecked'] = true;
      expect(component['isChecked']).toBe(true);
    });

    it('should set check state of checkbox to _isChecked', () => {
      component['isChecked'] = true;
      expect(component['_isChecked']).toBe(true);
    });

    it('should call setCheckedValueToControl when set check state', () => {
      component['setCheckedValueToControl'] = jasmine.createSpy();
      component['isChecked'] = true;
      expect(component['setCheckedValueToControl']).toHaveBeenCalled();
    });

    it('should call setCheckedValueToControl after view init if isChecked is true', () => {
      component['setCheckedValueToControl'] = jasmine.createSpy();
      component['_isChecked'] = true;
      component['ngAfterViewInit']();
      expect(component['setCheckedValueToControl']).toHaveBeenCalled();
    });

    it('should call onTouchedCallBack if onTouchedCallBack is setted', () => {
      component['onTouchedCallBack'] = jasmine.createSpy();
      component['onTouched']();
      expect(component['onTouchedCallBack']).toHaveBeenCalled();
    });

    it('should set getted state check', () => {
      component['writeValue'](true);
      expect(component['isChecked']).toBe(true);
    });

    it('should set isChecked from change event', () => {
      component['onChangeCallBack'] = jasmine.createSpy();
      const input = document.createElement('input');
      input.setAttribute('checked', 'true');
      const event = { target: <HTMLInputElement>input };
      component['onChange'](event);
      expect(component['onChangeCallBack']).toHaveBeenCalledWith(true);
    });

    it('should set check state to checkbox element', () => {
      component['_isChecked'] = true;
      component['setCheckedValueToControl']();
      fixture.detectChanges();
      expect(component['checkboxElRef']['nativeElement']['checked']).toBe(true);
    });
  });

  describe('template', () => {
    it('should set label to label element', () => {
      component['labelValue'] = 'label value';
      fixture.detectChanges();
      expect(findElement(fixture, '[data-test="label"]').nativeElement.textContent).toContain(
        'label value'
      );
    });
  });
});
