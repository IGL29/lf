import { TestBed } from '@angular/core/testing';

import { NotificationsService } from './notifications.service';
import { StoreService } from '../store/store.service';
import { INotifyWithId } from '../../store/notifications/notifications.reducer';
import { Observable, of } from 'rxjs';
import { mockStoreService } from '__tests__/mocks/services/StoreService';

const notifications: Observable<INotifyWithId[]> = of([]);

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotificationsService,
        {
          provide: StoreService,
          useValue: mockStoreService
        }
      ]
    });
    service = TestBed.inject(NotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return notifications', () => {
    mockStoreService.getNotifications.and.returnValue(notifications);
    expect(service.getNotifications()).toBe(notifications);
  });

  it('should be called StoreService.dispatchRemoveNotify with "id" argument', () => {
    const productId = '5';
    service.remove(productId);
    expect(mockStoreService.dispatchRemoveNotify).toHaveBeenCalledWith(productId);
  });

  it('should be called StoreService.dispatchRemoveNotifyAll', () => {
    service.removeAll();
    expect(mockStoreService.dispatchRemoveNotifyAll).toHaveBeenCalled();
  });
});
