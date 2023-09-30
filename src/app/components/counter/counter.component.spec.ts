import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterComponent } from './counter.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { mockUtilsService } from '__tests__/mocks/services/UtilsService';
import { findElement } from '__tests__/utils/findElement';
import { ReactiveFormsModule } from '@angular/forms';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CounterComponent],
      providers: [
        {
          provide: UtilsService,
          useValue: mockUtilsService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    mockUtilsService.generateRandomString.and.returnValue('randomString');
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set min value to input if set less min', () => {
    component.min = 5;
    component.value = 4;
    fixture.detectChanges();
    expect(component['countControl'].value).toBe(5);
  });

  it('should set max value to input if set more max', () => {
    component.max = 5;
    component.value = 8;
    fixture.detectChanges();
    expect(component['countControl'].value).toBe(5);
  });

  it('should call valueChange.emit with new value if input value changed', () => {
    spyOn(component.valueChange, 'emit');
    component.value = 8;
    fixture.detectChanges();
    expect(component.valueChange.emit).toHaveBeenCalledWith(8);
  });

  it('should call onChangeCallBack with new value if input value changed and onChangeCallBack setted', () => {
    component['onChangeCallBack'] = jasmine.createSpy();
    component.value = 8;
    fixture.detectChanges();
    expect(component['onChangeCallBack']).toHaveBeenCalledWith(8);
  });

  it('should call onTouchedCallBack if focusout triggered and onTouchedCallBack is set', () => {
    component['onTouchedCallBack'] = jasmine.createSpy();
    const inputDebugElement = findElement(fixture, '[data-test="input"]');
    inputDebugElement.triggerEventHandler('focusout');
    expect(component['onTouchedCallBack']).toHaveBeenCalled();
  });

  it('should decrement value', () => {
    component['countControl'].setValue(2);
    fixture.detectChanges();
    component['doDecrement']();
    fixture.detectChanges();
    expect(component['countControl'].value).toBe(1);
  });

  it('should increment value', () => {
    component['countControl'].setValue(6);
    fixture.detectChanges();
    component['doIncrement']();
    fixture.detectChanges();
    expect(component['countControl'].value).toBe(7);
  });

  it('should set value to control', () => {
    component['writeValue'](5);
    fixture.detectChanges();
    const inputDebugElement = findElement(fixture, '[data-test="input"]');
    expect(inputDebugElement.nativeElement.value).toBe('5');
  });

  it('should set onChangeCallBack', () => {
    const onChange = () => ({});
    component.registerOnChange(onChange);
    expect(component['onChangeCallBack']).toBe(onChange);
  });

  it('should set onTouchedCallBack', () => {
    const onTouched = () => ({});
    component.registerOnTouched(onTouched);
    expect(component['onTouchedCallBack']).toBe(onTouched);
  });
});
