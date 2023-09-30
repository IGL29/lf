import { TestBed } from '@angular/core/testing';

import { ReviewsService } from './reviews.service';
import { CommentsService } from '../comments/comments.service';
import { mockCommentsService } from '__tests__/mocks/services/CommentsService';
import { getMockReview } from '__tests__/mocks/data/review';
import { of } from 'rxjs';
import { INewReview } from '~components/review-form/types';

describe('ReviewsService', () => {
  let service: ReviewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReviewsService,
        {
          provide: CommentsService,
          useValue: mockCommentsService
        }
      ]
    });
    service = TestBed.inject(ReviewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be called CommentsService.requestComments with id', () => {
    const productId = 5;
    service.requestComments(productId);
    expect(mockCommentsService.requestComments).toHaveBeenCalledWith(productId);
  });

  it('should be return stream with comments', () => {
    const comments = [getMockReview(), getMockReview()];
    const commentsStream$ = of(comments);
    mockCommentsService.getComments.and.returnValue(commentsStream$);
    expect(service.getComments()).toEqual(commentsStream$);
  });

  it('should be return stream with state loading', () => {
    const loadingStream$ = of(true);
    mockCommentsService.commentsIsLoading.and.returnValue(loadingStream$);
    expect(service.commentsIsLoading()).toEqual(loadingStream$);
  });

  it('should be return stream with state error', () => {
    const errorStream$ = of(true);
    mockCommentsService.getCommentsError.and.returnValue(errorStream$);
    expect(service.getCommentsError()).toEqual(errorStream$);
  });

  it('should be return stream with state error', () => {
    const errorStream$ = of(true);
    mockCommentsService.getCommentsError.and.returnValue(errorStream$);
    expect(service.getCommentsError()).toEqual(errorStream$);
  });

  it('should be called commentService.postComment with new comment data', () => {
    const mockNewCommentData: INewReview = {
      author: 'Some author',
      comment: 'Cool',
      email: 'example@email.com',
      rating: 5
    };
    service.postComment(mockNewCommentData);
    expect(mockCommentsService.postComment).toHaveBeenCalledWith(mockNewCommentData);
  });

  it('should be return stream with true', () => {
    const resetFormStream$ = of<true>(true);
    service['resetFormStream$'] = resetFormStream$;
    expect(service.getResetFormStream()).toEqual(resetFormStream$);
  });

  it('should be return stream with state loading', () => {
    const loadingStream$ = of(true);
    mockCommentsService.postCommentLoading.and.returnValue(loadingStream$);
    expect(service.postCommentIsLoading()).toEqual(loadingStream$);
  });

  it('should be return stream with state error', () => {
    const errorStream$ = of(true);
    mockCommentsService.postCommentError.and.returnValue(errorStream$);
    expect(service.postCommentError()).toEqual(errorStream$);
  });

  it('should be passed true to resetFormStream', (done) => {
    service.getResetFormStream().subscribe((isReset) => {
      expect(isReset).toBeTrue();
      done();
    });
    service.resetForm();
  });
});
