import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyComponent } from './notify.component';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { getMockNotify } from '__tests__/mocks/data/notify';
import { findElement } from '__tests__/utils/findElement';

describe('NotifyComponent', () => {
  let component: NotifyComponent;
  let fixture: ComponentFixture<NotifyComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(NotifyComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    });
    await TestBed.configureTestingModule({
      declarations: [NotifyComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(NotifyComponent);
    component = fixture.componentInstance;
    component.notify = getMockNotify({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set notify title', () => {
    component.notify = { title: 'title text', type: 'warn', text: 'description' };
    fixture.detectChanges();
    const titleDebugElement = findElement(fixture, '[data-test="notifyTitle"]');
    expect(titleDebugElement.nativeElement.textContent).toContain('title text');
  });

  it('should set notify description', () => {
    component.notify = { title: 'title text', type: 'warn', text: 'description' };
    fixture.detectChanges();
    const descrDebugElement = findElement(fixture, '[data-test="notifyDescr"]');
    expect(descrDebugElement.nativeElement.textContent).toContain('description');
  });

  it('should call emitClose.emit if click on button close', () => {
    component.notify = { title: 'title text', type: 'warn', text: 'description' };
    fixture.detectChanges();
    const btnCloseDebugElement = findElement(fixture, '[data-test="buttonClose"]');
    spyOn(component.emitClose, 'emit');
    btnCloseDebugElement.triggerEventHandler('click');
    expect(component.emitClose.emit).toHaveBeenCalled();
  });
});
