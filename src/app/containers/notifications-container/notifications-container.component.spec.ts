import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsContainerComponent } from './notifications-container.component';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { mockNotificationsService } from '__tests__/mocks/services/NotificationsService';
import { of } from 'rxjs';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { findElement } from '__tests__/utils/findElement';

describe('NotificationsContainerComponent', () => {
  let component: NotificationsContainerComponent;
  let fixture: ComponentFixture<NotificationsContainerComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(NotificationsContainerComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    });
    await TestBed.configureTestingModule({
      declarations: [NotificationsContainerComponent],
      providers: [
        {
          provide: NotificationsService,
          useValue: mockNotificationsService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    mockNotificationsService.getNotifications.and.returnValue(
      of([{ id: '1', title: 'some title', type: 'warn' }])
    );
    fixture = TestBed.createComponent(NotificationsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('class', () => {
    it('should set notifications stream to notifications$', (done) => {
      component['notifications$'].subscribe((notifications) => {
        expect(notifications).toEqual([{ id: '1', title: 'some title', type: 'warn' }]);
        done();
      });
    });

    it('should call notificationsService.remove with id', () => {
      component['handlerNotifyClose']('2');
      expect(mockNotificationsService['remove']).toHaveBeenCalledWith('2');
    });

    it('should call notificationsService.removeAll', () => {
      component['handlerNotifyCloseAll']();
      expect(mockNotificationsService['removeAll']).toHaveBeenCalled();
    });
  });

  describe('template', () => {
    it('should pass notifications to notifications component', async () => {
      component['notifications$'] = of([{ id: '1', title: 'some title', type: 'warn' }]);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const notificationsDebugElement = findElement(fixture, '[data-test="notifications"]');
        expect(notificationsDebugElement.nativeElement['notifications']).toEqual([
          { id: '1', title: 'some title', type: 'warn' }
        ]);
      });
    });

    it('should call handlerNotifyClose with notify id if emit emitHide event', () => {
      const notificationsDebugElement = findElement(fixture, '[data-test="notifications"]');
      component['handlerNotifyClose'] = jasmine.createSpy();
      notificationsDebugElement.triggerEventHandler('emitHide', '5');
      expect(component['handlerNotifyClose']).toHaveBeenCalledWith('5');
    });

    it('should call handlerNotifyCloseAll with if emit emitHideAll event', () => {
      const notificationsDebugElement = findElement(fixture, '[data-test="notifications"]');
      component['handlerNotifyCloseAll'] = jasmine.createSpy();
      notificationsDebugElement.triggerEventHandler('emitHideAll');
      expect(component['handlerNotifyCloseAll']).toHaveBeenCalled();
    });
  });
});
