import { TestBed } from '@angular/core/testing';

import { FeedbackService } from './feedback.service';
import { StoreService } from '../store/store.service';
import { getMockFeedbackData } from '__tests__/mocks/data/feedback';
import { mockStoreService } from '__tests__/mocks/services/StoreService';
import { of } from 'rxjs';

describe('FeedbackService', () => {
  let service: FeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FeedbackService,
        {
          provide: StoreService,
          useValue: mockStoreService
        }
      ]
    });
    service = TestBed.inject(FeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be called StoreService.dispatchPostFeedback with feedback data', () => {
    service.submitForm(getMockFeedbackData());
    expect(mockStoreService.dispatchPostFeedback).toHaveBeenCalledWith(getMockFeedbackData());
  });

  it('should be return stream with state loading', (done) => {
    mockStoreService.feedbackIsLoading.and.returnValue(of(true));
    service.getFeedbackIsLoading().subscribe((isLoading) => {
      expect(isLoading).toBeTrue();
      done();
    });
  });

  it('should be return stream', () => {
    const clearFormStream$ = of(true);
    service['clearForm$'] = clearFormStream$;
    expect(service.getClearFormStream$()).toEqual(clearFormStream$);
  });

  it('should be push true to stream', (done) => {
    service['clearFormSubject'].subscribe((isResetForm) => {
      expect(isResetForm).toBeTrue();
      done();
    });
    service.doClearForm();
  });
});
