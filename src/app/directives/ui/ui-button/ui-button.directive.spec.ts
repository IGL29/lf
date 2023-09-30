import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UiButtonDirective } from './ui-button.directive';

@Component({
  template: `
    <button data-test="withoutArgs" appUiButton>Some text</button>
    <button data-test="withoutUnknownArg" appUiButton="unknownArg">Some text</button>
    <button data-test="1" appUiButton="1">Some text</button>
    <button data-test="2" appUiButton="2">Some text</button>
    <button data-test="3" appUiButton="3">Some text</button>
    <button data-test="4" appUiButton="4">Some text</button>
    <div uiButton></div>
  `
})
class TestComponent {}

let fixture: ComponentFixture<TestComponent>;
let buttonElementWithoutArgs: DebugElement;
let buttonElementWithoutUnknownArg: DebugElement;
let buttonElementVariant1: DebugElement;
let buttonElementVariant2: DebugElement;
let buttonElementVariant3: DebugElement;
let buttonElementVariant4: DebugElement;
let divElement: DebugElement;

describe('UiButtonDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, UiButtonDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    buttonElementWithoutArgs = fixture.debugElement.query(
      By.css('button[data-test="withoutArgs"]')
    );
    buttonElementWithoutUnknownArg = fixture.debugElement.query(
      By.css('button[data-test="withoutUnknownArg"]')
    );
    buttonElementVariant1 = fixture.debugElement.query(By.css('button[data-test="1"]'));
    buttonElementVariant2 = fixture.debugElement.query(By.css('button[data-test="2"]'));
    buttonElementVariant3 = fixture.debugElement.query(By.css('button[data-test="3"]'));
    buttonElementVariant4 = fixture.debugElement.query(By.css('button[data-test="4"]'));
    divElement = fixture.debugElement.query(By.css('div'));
  });

  it('should create test component', () => {
    expect(fixture.componentInstance).toBeDefined();
  });

  it('should not add class to div', () => {
    const isNotContainClass = divElement.nativeElement.classList.contains('button-1');
    expect(isNotContainClass).toBe(false);
  });

  it('should add class to button', () => {
    const isContainClass = buttonElementVariant1.nativeElement.classList.contains('button-1');
    expect(isContainClass).toBe(true);
  });

  it('should add default class to button if arg not pass', () => {
    const isContainClass = buttonElementWithoutArgs.nativeElement.classList.contains('button-1');
    expect(isContainClass).toBe(true);
  });

  it('should add default class to button if arg unknown', () => {
    const isContainClass =
      buttonElementWithoutUnknownArg.nativeElement.classList.contains('button-1');
    expect(isContainClass).toBe(true);
  });

  it('should add correctly class to button when passed 2', () => {
    const isContainClass = buttonElementVariant2.nativeElement.classList.contains('button-2');
    expect(isContainClass).toBe(true);
  });

  it('should add correctly class to button when passed 3', () => {
    const isContainClass = buttonElementVariant3.nativeElement.classList.contains('button-3');
    expect(isContainClass).toBe(true);
  });

  it('should add correctly class to button when passed 4', () => {
    const isContainClass = buttonElementVariant4.nativeElement.classList.contains('button-4');
    expect(isContainClass).toBe(true);
  });
});
