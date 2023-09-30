import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPaymentComponent } from './delivery-payment.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';

describe('DeliveryPaymentComponent', () => {
  let component: DeliveryPaymentComponent;
  let fixture: ComponentFixture<DeliveryPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryPaymentComponent],
      imports: [NgxMaskPipe],
      providers: [provideNgxMask()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
