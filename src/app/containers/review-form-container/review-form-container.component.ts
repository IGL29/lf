import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { INewReview } from 'src/app/components/review-form/types';
import { ReviewsService } from 'src/app/services/reviews/reviews.service';
import { ReviewFormComponent } from '~components/review-form/review-form.component';
import { ErrorPayload } from '~types/apiPayloads';

@Component({
  selector: 'app-review-form-container',
  templateUrl: './review-form-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewFormContainerComponent implements OnInit, OnDestroy {
  @ViewChild('reviewForm', { read: ReviewFormComponent }) reviewFormComponent: ReviewFormComponent;
  private destroySubject: Subject<null> = new Subject();
  protected isFormSubmitted = false;
  protected reviewIsLoading = false;
  protected reviewsIsLoading = false;
  protected reviewError: ErrorPayload['error'] | null;
  protected isExistReviews = false;
  private initialData: INewReview = {
    rating: null,
    comment: '',
    author: '',
    email: ''
  };
  protected formData = { ...this.initialData };

  constructor(private cdr: ChangeDetectorRef, private reviewsService: ReviewsService) {}

  ngOnInit(): void {
    this.subscribeToPostCommentLoading();
    this.subscribeToPostCommentError();
    this.subscribeToReviewsLoading();
    this.subscribeToResetForm();
    this.subscribeToComments();
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  private subscribeToComments(): void {
    this.reviewsService
      .getComments()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((reviews) => {
        this.isExistReviews = reviews !== null && !!reviews.length;
        this.cdr.markForCheck();
      });
  }

  private subscribeToPostCommentError() {
    this.reviewsService
      .postCommentError()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((error) => {
        this.reviewError = error;
        this.cdr.markForCheck();
      });
  }

  private subscribeToResetForm() {
    this.reviewsService
      .getResetFormStream()
      .pipe(takeUntil(this.destroySubject))
      .subscribe(() => {
        this.resetForm();
        this.cdr.markForCheck();
      });
  }

  private subscribeToPostCommentLoading() {
    this.reviewsService
      .postCommentIsLoading()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((reviewIsLoading) => {
        this.reviewIsLoading = reviewIsLoading;
        this.cdr.markForCheck();
      });
  }

  private subscribeToReviewsLoading() {
    this.reviewsService
      .commentsIsLoading()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((reviewsIsLoading) => {
        this.reviewsIsLoading = reviewsIsLoading;
        this.cdr.markForCheck();
      });
  }

  protected handlerReviewSubmit(formData: INewReview) {
    this.reviewsService.postComment(formData);
  }

  private resetForm() {
    if (!this.reviewFormComponent) {
      return;
    }
    this.reviewFormComponent.resetForm();
  }
}
