import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackFormContainerComponent } from './feedback-form-container.component';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { mockFeedbackService } from '__tests__/mocks/services/FeedbackService';
import { of } from 'rxjs';
import { findElement } from '__tests__/utils/findElement';

describe('FeedbackFormContainerComponent', () => {
  let component: FeedbackFormContainerComponent;
  let fixture: ComponentFixture<FeedbackFormContainerComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(FeedbackFormContainerComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    });
    await TestBed.configureTestingModule({
      declarations: [FeedbackFormContainerComponent],
      providers: [
        {
          provide: FeedbackService,
          useValue: mockFeedbackService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackFormContainerComponent);
    mockFeedbackService.getClearFormStream$.and.returnValue(of(true));
    mockFeedbackService.getFeedbackIsLoading.and.returnValue(of(true));
    mockFeedbackService.submitForm.and.returnValue(of(true));
    mockFeedbackService.resetForm.and.returnValue(of(true));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('class', () => {
    it('should subscribe', () => {
      component['subscribeToLoading'] = jasmine.createSpy();
      component['subscribeToResetForm'] = jasmine.createSpy();
      component.ngOnInit();
      expect(component['subscribeToLoading']).toHaveBeenCalled();
      expect(component['subscribeToResetForm']).toHaveBeenCalled();
    });

    it('should unsubscribe', () => {
      component['destroySubject'] = jasmine.createSpyObj(['next', 'complete']);
      component.ngOnDestroy();
      expect(component['destroySubject'].next).toHaveBeenCalled();
      expect(component['destroySubject'].complete).toHaveBeenCalled();
    });

    it('should call resetForm ', () => {
      mockFeedbackService.getClearFormStream$.and.returnValue(of(true));
      component['resetForm'] = jasmine.createSpy();
      component['subscribeToResetForm']();
      expect(component['resetForm']).toHaveBeenCalled();
    });

    it('should set feedback loading state to isLoading ', () => {
      component['isLoading'] = false;
      component['subscribeToLoading']();
      expect(component['isLoading']).toBeTrue();
    });

    it('should call feedbackService.submitForm with feedback data', () => {
      component['handlerSubmitForm'](<any>{ phone: '89999999999' });
      expect(mockFeedbackService.submitForm).toHaveBeenCalledWith({ phone: '89999999999' });
    });

    it('should call feedback.resetForm', () => {
      component['feedbackForm']['resetForm'] = jasmine.createSpy();
      component['resetForm']();
      expect(component['feedbackForm']['resetForm']).toHaveBeenCalled();
    });
  });

  describe('template', () => {
    it('should pass isLoading to feedback form component', () => {
      component['isLoading'] = true;
      fixture.detectChanges();
      const feedbackFormDebugElement = findElement(fixture, '[data-test="feedbackForm"]');
      expect(feedbackFormDebugElement.nativeElement.isLoading).toBeTrue();
    });

    it('should call handlerSubmitForm with feedback data if emit emitFormSubmit event', () => {
      const feedbackFormDebugElement = findElement(fixture, '[data-test="feedbackForm"]');
      component['handlerSubmitForm'] = jasmine.createSpy();
      feedbackFormDebugElement.triggerEventHandler('emitFormSubmit', { phone: '89999999999' });
      expect(component['handlerSubmitForm']).toHaveBeenCalledWith(<any>{ phone: '89999999999' });
    });
  });
});
