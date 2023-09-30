import { TestBed } from '@angular/core/testing';

import { ApiCorporateService } from './api-corporate.service';
import { HttpService } from '../../http/http.service';
import { mockHttpService } from '__tests__/mocks/services/httpService';
import { of } from 'rxjs';

describe('ApiCorporateService', () => {
  let service: ApiCorporateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpService,
          useValue: mockHttpService
        }
      ]
    });
    service = TestBed.inject(ApiCorporateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('postRequest', () => {
    const corporateData: any = { phone: '56546456457' };

    it('should return stream response', () => {
      const successPayload = of({ data: 'success' });
      mockHttpService.post.and.returnValue(successPayload);
      expect(service.postRequest(corporateData)).toEqual(successPayload);
    });

    it('should call http.post with correctly args', () => {
      service.postRequest(corporateData);
      expect(mockHttpService.post).toHaveBeenCalledWith(
        `${service['api']}/corporate`,
        corporateData
      );
    });
  });
});
