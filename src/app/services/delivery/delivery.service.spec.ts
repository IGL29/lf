import { TestBed } from '@angular/core/testing';

import { DeliveryService } from './delivery.service';

describe('DeliveryService', () => {
  let service: DeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryService);
  });

  beforeEach(() => {
    service['deliveryPrice'] = { courier: 400, pickup: 0 };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return zero if delivery method pickup', () => {
    expect(service.getPrice('pickup')).toBe(0);
    expect(service.getPrice(<any>'other method')).toBe(0);
  });

  it('should return zero if delivery method unknown', () => {
    expect(service.getPrice(<any>'other method')).toBe(0);
  });

  it('should return correctly price if delivery method courier', () => {
    expect(service.getPrice('courier')).toBe(400);
  });
});
