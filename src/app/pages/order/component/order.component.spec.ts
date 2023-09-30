import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { mockOrderService } from '__tests__/mocks/services/OrderService';
import { DeliveryService } from 'src/app/services/delivery/delivery.service';
import { mockDeliveryService } from '__tests__/mocks/services/DeliveryService';
import { PromocodeService } from 'src/app/services/promocode/promocode.service';
import { mockPromocodeService } from '__tests__/mocks/services/PromocodeService';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderComponent],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService
        },
        {
          provide: DeliveryService,
          useValue: mockDeliveryService
        },
        {
          provide: PromocodeService,
          useValue: mockPromocodeService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    component['createOrderFormGroups'] = jasmine.createSpy();
    component['subscribeToOrderLoading'] = jasmine.createSpy();
    component['subscribeToPromocodeDiscount'] = jasmine.createSpy();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
