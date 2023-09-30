import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewListContainerComponent } from './review-list-container.component';
import { ProductsService } from 'src/app/services/products/products.service';
import { mockProductsData, mockProductsService } from '__tests__/mocks/services/ProductsService';
import { ReviewsService } from 'src/app/services/reviews/reviews.service';
import { mockReviewsData, mockReviewsService } from '__tests__/mocks/services/ReviewsService';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('ReviewListContainerComponent', () => {
  let component: ReviewListContainerComponent;
  let fixture: ComponentFixture<ReviewListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewListContainerComponent],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService
        },
        {
          provide: ReviewsService,
          useValue: mockReviewsService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewListContainerComponent);
    component = fixture.componentInstance;
    mockProductsService.getProduct.and.returnValue(of(mockProductsData));
    mockReviewsService.getComments.and.returnValue(of(mockReviewsData));
    mockReviewsService.commentsIsLoading.and.returnValue(of(true));
    mockReviewsService.getCommentsError.and.returnValue(of(true));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
