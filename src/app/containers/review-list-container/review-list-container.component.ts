import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { map, Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/services/products/products.service';
import { ReviewsService } from 'src/app/services/reviews/reviews.service';
import { IReview } from '~components/review/types';
import { ErrorPayload } from '~types/apiPayloads';

@Component({
  selector: 'app-review-list-container',
  templateUrl: './review-list-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewListContainerComponent implements OnInit, OnDestroy {
  private destroySubject: Subject<null> = new Subject();
  private productId: number;
  public reviews: IReview[] | [] = [];
  public IsLoading = false;
  public error: ErrorPayload['error'] | null = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private productsService: ProductsService,
    private reviewsService: ReviewsService
  ) {}

  ngOnInit(): void {
    this.subscribeToProduct();
    this.subscribeToComments();
    this.subscribeToCommentsLoading();
    this.subscribeToCommentsError();
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  public requestComments(id: number): void {
    this.reviewsService.requestComments(id);
  }

  private subscribeToProduct(): void {
    this.productsService
      .getProduct()
      .pipe(
        takeUntil(this.destroySubject),
        map((product) => product?.id)
      )
      .subscribe((id) => {
        if (id === undefined) {
          return;
        }
        this.productId = id;
        this.requestComments(id);
      });
  }

  private subscribeToComments(): void {
    this.reviewsService
      .getComments()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((reviews) => {
        this.reviews = reviews ? reviews : [];
        this.cdr.markForCheck();
      });
  }

  private subscribeToCommentsLoading(): void {
    this.reviewsService
      .commentsIsLoading()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((reviewsIsLoading) => {
        this.IsLoading = reviewsIsLoading;
        this.cdr.markForCheck();
      });
  }

  private subscribeToCommentsError(): void {
    this.reviewsService
      .getCommentsError()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((error) => {
        this.error = error;
      });
  }

  public repeatRequestComments(): void {
    this.requestComments(this.productId);
  }
}
