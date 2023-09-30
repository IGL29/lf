import { TestBed } from '@angular/core/testing';

import { PROMOCODE, PromocodeService } from './promocode.service';
import { of } from 'rxjs';

describe('PromocodeService', () => {
  let service: PromocodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromocodeService]
    });
    service = TestBed.inject(PromocodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return stream with discount', () => {
    const streamDiscount$ = of(1000);
    service['promocodeStream$'] = streamDiscount$;
    expect(service.promocodeDiscount).toEqual(streamDiscount$);
  });

  it('should return discount in stream if passed corectly promocode', (done) => {
    service.promocodeDiscount.subscribe((discount) => {
      expect(discount).toBe(PROMOCODE['SALE']);
      done();
    });
    service.getDiscount('SALE');
  });

  it('should return discount in stream if passed corectly promocode', (done) => {
    service.promocodeDiscount.subscribe((discount) => {
      expect(discount).toBe(PROMOCODE['SALE-10']);
      done();
    });
    service.getDiscount('SALE-10');
  });

  it('should return discount in stream if passed corectly promocode', (done) => {
    service.promocodeDiscount.subscribe((discount) => {
      expect(discount).toBe(PROMOCODE['SALE-20']);
      done();
    });
    service.getDiscount('SALE-20');
  });

  it('should return zero in stream if passed not corectly promocode', (done) => {
    service.promocodeDiscount.subscribe((discount) => {
      expect(discount).toBe(0);
      done();
    });
    service.getDiscount('SALE-BILLION');
  });
});
