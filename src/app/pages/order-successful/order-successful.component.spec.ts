import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSuccessfulComponent } from './order-successful.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mockActivatedRoute } from '__tests__/mocks/services/ActivatedRoute';

describe('PaymentSuccessfulComponent', () => {
  let component: OrderSuccessfulComponent;
  let fixture: ComponentFixture<OrderSuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderSuccessfulComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
