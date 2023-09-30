import { TestBed } from '@angular/core/testing';

import { ApiOrderService } from './api-order.service';
import { HttpService } from '../../http/http.service';
import { mockHttpService } from '__tests__/mocks/services/httpService';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

describe('ApiOrderService', () => {
  let service: ApiOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpService,
          useValue: mockHttpService
        }
      ]
    });
    service = TestBed.inject(ApiOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('postOrder', () => {
    const response = of({ data: 'success' });
    const orderData: any = { phone: '12312312123' };

    it('should return stream response', () => {
      mockHttpService.post.and.returnValue(response);
      expect(service.postOrder(orderData)).toEqual(response);
    });

    it('should call http.post with correctly args', () => {
      service.postOrder(orderData);
      expect(mockHttpService.post).toHaveBeenCalledWith(`${environment.api}/order`, orderData);
    });
  });
});
