import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgerMenuComponent } from './burger-menu.component';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { findElement } from '__tests__/utils/findElement';

describe('BurgerMenuComponent', () => {
  let component: BurgerMenuComponent;
  let fixture: ComponentFixture<BurgerMenuComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(BurgerMenuComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    });
    await TestBed.configureTestingModule({
      declarations: [BurgerMenuComponent],
      imports: [NgxMaskPipe],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        provideNgxMask({
          validation: false
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BurgerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit emitCloseMenu if called closeMenu', () => {
    spyOn(component.emitCloseMenu, 'emit');
    component.closeMenu();
    expect(component.emitCloseMenu.emit).toHaveBeenCalled();
  });

  it('should call closeMenu if click on button', () => {
    spyOn(component, 'closeMenu');
    const btnCloseDebugElement = findElement(fixture, '[data-test="btnClose"]');
    btnCloseDebugElement.triggerEventHandler('click');
    expect(component.closeMenu).toHaveBeenCalled();
  });
});
