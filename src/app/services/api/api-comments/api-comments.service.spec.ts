import { TestBed } from '@angular/core/testing';

import { ApiCommentsService } from './api-comments.service';
import { HttpService } from '../../http/http.service';
import { mockHttpService } from '__tests__/mocks/services/httpService';
import { getMockNewReview, getMockReview } from '__tests__/mocks/data/review';
import { of } from 'rxjs';

describe('ApiCommentsService', () => {
  let service: ApiCommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpService,
          useValue: mockHttpService
        }
      ]
    });
    service = TestBed.inject(ApiCommentsService);
  });

  beforeEach(() => {
    mockHttpService.get.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getComments', () => {
    const reviewsStream$ = of([getMockReview(), getMockReview()]);
    const productId = 5;

    it('should return stream reviews', () => {
      mockHttpService.get.and.returnValue(reviewsStream$);
      expect(service.getComments(productId)).toEqual(reviewsStream$);
    });

    it('should call http.get with correctly args', () => {
      service.getComments(productId);
      expect(mockHttpService.get).toHaveBeenCalledWith(`${service['api']}/comments/${productId}`);
    });
  });

  describe('postComments', () => {
    const newReview = getMockNewReview();
    const reviewsStream$ = of([getMockReview(), getMockReview()]);

    it('should return stream reviews', () => {
      mockHttpService.post.and.returnValue(reviewsStream$);
      expect(service.postComment(newReview)).toEqual(reviewsStream$);
    });

    it('should call http.get with correctly args', () => {
      service.postComment(newReview);
      expect(mockHttpService.post).toHaveBeenCalledWith(`${service['api']}/comments`, newReview);
    });
  });
});
