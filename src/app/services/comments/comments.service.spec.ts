import { TestBed } from '@angular/core/testing';

import { CommentsService } from './comments.service';
import { mockStoreService } from '__tests__/mocks/services/StoreService';
import { getMockNewReview, getMockReview } from '__tests__/mocks/data/review';
import { of } from 'rxjs';
import { StoreService } from '../store/store.service';

describe('CommentsService', () => {
  let service: CommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StoreService,
          useValue: mockStoreService
        }
      ]
    });
    service = TestBed.inject(CommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call StoreService.dispatchRequestComments with id', () => {
    const productId = 5;
    service.requestComments(productId);
    expect(mockStoreService.dispatchRequestComments).toHaveBeenCalledWith(productId);
  });

  it('should return stream with reviews', () => {
    const reviewsStream$ = of([getMockReview(), getMockReview()]);
    mockStoreService.getComments.and.returnValue(reviewsStream$);
    expect(service.getComments()).toEqual(reviewsStream$);
  });

  it('should return stream with state error', () => {
    const errorStream$ = of([getMockReview(), getMockReview()]);
    mockStoreService.getCommentsError.and.returnValue(errorStream$);
    expect(service.getCommentsError()).toEqual(errorStream$);
  });

  it('should call StoreService.dispatchPostComment with new review data', () => {
    const reviewData = getMockNewReview();
    service.postComment(reviewData);
    expect(mockStoreService.dispatchPostComment).toHaveBeenCalledWith(reviewData);
  });

  it('should return stream with state loading', () => {
    const streamLoading$ = of(true);
    mockStoreService.commentIsLoading.and.returnValue(streamLoading$);
    expect(service.postCommentLoading()).toEqual(streamLoading$);
  });

  it('should return stream with state error', () => {
    const streamError$ = of(true);
    mockStoreService.commentError.and.returnValue(streamError$);
    expect(service.postCommentError()).toEqual(streamError$);
  });

  it('should return stream with state comments loading', () => {
    const streamError$ = of(true);
    mockStoreService.commentsIsLoading.and.returnValue(streamError$);
    expect(service.commentsIsLoading()).toEqual(streamError$);
  });
});
