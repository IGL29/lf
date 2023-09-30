import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import { mockStoreService } from '__tests__/mocks/services/StoreService';
import { StoreService } from '../store/store.service';
import { Observable } from 'rxjs';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderService,
        {
          provide: StoreService,
          useValue: mockStoreService
        }
      ]
    });
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be called getResetFormStream and return stream', (done) => {
    service.getResetFormStream().subscribe((value) => {
      expect(value).toBe(true);
      done();
    });
    service.doClearForm();
  });

  it('should be called resetFormSubject.next and get true from stream', () => {
    service['resetFormSubject'] = jasmine.createSpyObj(['next']);
    service.doClearForm();
    expect(service['resetFormSubject'].next).toHaveBeenCalledOnceWith(true);
  });

  it('should be return stream with boolean', () => {
    const stream$ = new Observable<boolean>();
    mockStoreService.orderLoading.and.returnValue(stream$);
    expect(service.getOrderLoading()).toEqual(stream$);
  });

  it('should be called store.dispatchOrder with correctly argument', () => {
    const mockOrderData: any = {
      user: 'username'
    };
    service.postOrder(mockOrderData);
    expect(mockStoreService.dispatchOrder).toHaveBeenCalledWith(mockOrderData);
  });
});
