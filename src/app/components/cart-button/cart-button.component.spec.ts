import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartButtonComponent } from './cart-button.component';
import { ChangeDetectionStrategy, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { MaxNumberModule } from 'src/app/pipes/max-number/max-number.module';
import { findElement } from '__tests__/utils/findElement';

describe('CartButtonComponent', () => {
  let component: CartButtonComponent;
  let fixture: ComponentFixture<CartButtonComponent>;
  let wrapperCountDebugEl: DebugElement;

  beforeEach(async () => {
    TestBed.overrideComponent(CartButtonComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    });
    await TestBed.configureTestingModule({
      declarations: [CartButtonComponent],
      imports: [MaxNumberModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CartButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    wrapperCountDebugEl = findElement(fixture, '[data-test="wrapperCount"]');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true if count more ziro', () => {
    component.count = 10;
    expect(component.isCountVisible).toBeTrue();
  });

  it('should return false if count is ziro', () => {
    component.count = 0;
    expect(component.isCountVisible).toBeFalse();
  });

  it('should render count', () => {
    const countValueDebugEl = findElement(fixture, '[data-test="countValue"]');
    component.count = 15;
    fixture.detectChanges();
    expect(countValueDebugEl.nativeElement.textContent).toContain('15');
  });

  it('should set "count--opacity-1" css class to wrapperCount if isCountVisible', () => {
    spyOnProperty(component, 'isCountVisible').and.returnValue(true);
    fixture.detectChanges();
    expect(wrapperCountDebugEl.nativeElement.classList.contains('count--opacity-1')).toBeTrue();
  });

  it('should remove "count--opacity-1" css class from wrapperCount if isCountVisible is false', () => {
    spyOnProperty(component, 'isCountVisible').and.returnValue(false);
    fixture.detectChanges();
    expect(wrapperCountDebugEl.nativeElement.classList.contains('count--opacity-1')).toBeFalse();
  });
});
