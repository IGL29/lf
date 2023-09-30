import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewFormContainerComponent } from './review-form-container.component';
import { ReviewsService } from 'src/app/services/reviews/reviews.service';
import { mockReviewsData, mockReviewsService } from '__tests__/mocks/services/ReviewsService';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { getMockNewReview } from '__tests__/mocks/data/review';
import { findElement } from '__tests__/utils/findElement';

describe('ReviewFormContainerComponent', () => {
  let component: ReviewFormContainerComponent;
  let fixture: ComponentFixture<ReviewFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewFormContainerComponent],
      providers: [
        {
          provide: ReviewsService,
          useValue: mockReviewsService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewFormContainerComponent);
    component = fixture.componentInstance;
    mockReviewsService.getComments.and.returnValue(of(mockReviewsData));
    mockReviewsService.commentsIsLoading.and.returnValue(of(true));
    mockReviewsService.postCommentError.and.returnValue(of(true));
    mockReviewsService.getResetFormStream.and.returnValue(of(true));
    mockReviewsService.postCommentIsLoading.and.returnValue(of(true));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('class', () => {
    it('should subscribe', () => {
      component['subscribeToPostCommentLoading'] = jasmine.createSpy();
      component['subscribeToPostCommentError'] = jasmine.createSpy();
      component['subscribeToReviewsLoading'] = jasmine.createSpy();
      component['subscribeToResetForm'] = jasmine.createSpy();
      component['subscribeToComments'] = jasmine.createSpy();
      component.ngOnInit();
      expect(component['subscribeToPostCommentLoading']).toHaveBeenCalled();
      expect(component['subscribeToPostCommentError']).toHaveBeenCalled();
      expect(component['subscribeToReviewsLoading']).toHaveBeenCalled();
      expect(component['subscribeToResetForm']).toHaveBeenCalled();
      expect(component['subscribeToComments']).toHaveBeenCalled();
    });

    it('should unsubscribe', () => {
      component['destroySubject'] = jasmine.createSpyObj(['next', 'complete']);
      component.ngOnDestroy();
      expect(component['destroySubject'].next).toHaveBeenCalled();
      expect(component['destroySubject'].complete).toHaveBeenCalled();
    });

    it('should set isExistReviews is true if review not empty', () => {
      component['subscribeToComments']();
      expect(component['isExistReviews']).toBeTrue();
    });

    it('should set isExistReviews is false if review is empty', () => {
      mockReviewsService.getComments.and.returnValue(of([]));
      component['subscribeToComments']();
      expect(component['isExistReviews']).toBeFalse();
    });

    it('should set review error is true if error is exist', () => {
      component['subscribeToPostCommentError']();
      expect(component['reviewError']).toBeTrue();
    });

    it('should set review error is true if error is exist', () => {
      mockReviewsService.postCommentError.and.returnValue(of(null));
      component['subscribeToPostCommentError']();
      expect(component['reviewError']).toBeFalsy();
    });

    it('should call resetForm', () => {
      component['resetForm'] = jasmine.createSpy();
      component['subscribeToResetForm']();
      expect(component['resetForm']).toHaveBeenCalled();
    });

    it('should set reviewsIsLoading', () => {
      component['resetForm'] = jasmine.createSpy();
      component['subscribeToReviewsLoading']();
      expect(component['reviewsIsLoading']).toBeTrue();
    });

    it('should set reviewIsLoading', () => {
      component['resetForm'] = jasmine.createSpy();
      component['subscribeToPostCommentLoading']();
      expect(component['reviewIsLoading']).toBeTrue();
    });

    it('should call reviewsService.postComment with new review data', () => {
      mockReviewsService['postComment'] = jasmine.createSpy();
      component['handlerReviewSubmit'](getMockNewReview());
      expect(mockReviewsService['postComment']).toHaveBeenCalledWith(getMockNewReview());
    });

    it('should call reviewFormComponent.resetForm', () => {
      component['reviewFormComponent'] = jasmine.createSpyObj(['resetForm']);
      component['resetForm']();
      expect(component['reviewFormComponent']['resetForm']).toHaveBeenCalled();
    });
  });

  describe('template', () => {
    it('should set reviewFormData to review form component', () => {
      const reviewFormDebugElement = findElement(fixture, '[data-test="reviewForm"]');
      expect(reviewFormDebugElement.nativeElement.reviewFormData).toEqual(component['formData']);
    });

    it('should set isExistReviews to review form component', () => {
      const reviewFormDebugElement = findElement(fixture, '[data-test="reviewForm"]');
      expect(reviewFormDebugElement.nativeElement.isExistReviews).toBe(component['isExistReviews']);
    });

    it('should set isLoading to review form component', () => {
      const reviewFormDebugElement = findElement(fixture, '[data-test="reviewForm"]');
      expect(reviewFormDebugElement.nativeElement.isLoading).toBe(component['reviewIsLoading']);
    });

    it('should set isReviewsLoading to review form component', () => {
      const reviewFormDebugElement = findElement(fixture, '[data-test="reviewForm"]');
      expect(reviewFormDebugElement.nativeElement.isReviewsLoading).toBe(
        component['reviewsIsLoading']
      );
    });

    it('should set error to review form component', () => {
      const reviewFormDebugElement = findElement(fixture, '[data-test="reviewForm"]');
      expect(reviewFormDebugElement.nativeElement.error).toBe(component['reviewError']);
    });

    it('should call handlerReviewSubmit with new review data if emit emitSubmitForm event', () => {
      component['handlerReviewSubmit'] = jasmine.createSpy();
      const reviewFormDebugElement = findElement(fixture, '[data-test="reviewForm"]');
      reviewFormDebugElement.triggerEventHandler('emitSubmitForm', getMockNewReview());
      expect(component['handlerReviewSubmit']).toHaveBeenCalledWith(getMockNewReview());
    });
  });
});
