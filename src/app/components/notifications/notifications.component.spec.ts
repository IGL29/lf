import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { NotificationsComponent } from './notifications.component';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { findElement } from '__tests__/utils/findElement';
import { getMockNotify } from '__tests__/mocks/data/notify';
import { findAllElements } from '__tests__/utils/findAllElements';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NotificationsComponent', () => {
  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(NotificationsComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    });
    await TestBed.configureTestingModule({
      declarations: [NotificationsComponent],
      imports: [BrowserAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide notifications wrapper if no notifications', () => {
    const notificationDebugElement = findElement(fixture, '[data-test="notify"]');
    expect(!!notificationDebugElement).toBeFalse();
  });

  it('should hide notifications wrapper if no notifications', () => {
    component.notifications = [
      { id: '1', ...getMockNotify() },
      { id: '2', ...getMockNotify() }
    ];
    fixture.detectChanges();
    const notificationsDebugElements = findAllElements(fixture, '[data-test="notify"]');
    expect(notificationsDebugElements.length).toBe(2);
  });

  it('should call emitHide with notify id if emitClose event was triggered on notify', () => {
    component.notifications = [
      { id: '1', ...getMockNotify() },
      { id: '2', ...getMockNotify() }
    ];
    fixture.detectChanges();
    const notificationsDebugElements = findAllElements(fixture, '[data-test="notify"]');
    spyOn(component.emitHide, 'emit');
    notificationsDebugElements[0].triggerEventHandler('emitClose');
    expect(component.emitHide.emit).toHaveBeenCalledWith('1');
  });

  it('should show button hide all if notifications more one', () => {
    component.notifications = [
      { id: '1', ...getMockNotify() },
      { id: '2', ...getMockNotify() }
    ];
    fixture.detectChanges();
    const btnHideAllDebugElement = findElement(fixture, '[data-test="buttonHideAll"]');
    expect(btnHideAllDebugElement).toBeTruthy();
  });

  it('should call emitHideAll if click on notifications wrapper', fakeAsync(() => {
    component.notifications = [
      { id: '1', ...getMockNotify() },
      { id: '2', ...getMockNotify() }
    ];
    fixture.detectChanges();
    spyOn(component.emitHideAll, 'emit');
    const wrapperDebugElement = findElement(fixture, '[data-test="wrapper"]');
    wrapperDebugElement.triggerEventHandler('click');
    expect(component.emitHideAll.emit).toHaveBeenCalled();
  }));
});
