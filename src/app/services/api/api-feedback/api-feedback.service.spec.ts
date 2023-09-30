import { TestBed } from '@angular/core/testing';

import { ApiFeedbackService } from './api-feedback.service';
import { HttpService } from '../../http/http.service';
import { mockHttpService } from '__tests__/mocks/services/httpService';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

describe('ApiFeedbackService', () => {
  let service: ApiFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpService,
          useValue: mockHttpService
        }
      ]
    });
    service = TestBed.inject(ApiFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('postFeedback', () => {
    const response = of({ data: 'success' });
    const feedbackData: any = { phone: '12312312123' };

    it('should return stream response', () => {
      mockHttpService.post.and.returnValue(response);
      expect(service.postFeedback(feedbackData)).toEqual(response);
    });

    it('should call http.post with correctly args', () => {
      service.postFeedback(feedbackData);
      expect(mockHttpService.post).toHaveBeenCalledWith(
        `${environment.api}/feedback`,
        feedbackData
      );
    });
  });
});
