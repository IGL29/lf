import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { FeedbackFormComponent } from '~components/feedback-form/feedback-form.component';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { IFeedbackData } from 'src/app/components/feedback-form/types';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-feedback-form-container',
  templateUrl: './feedback-form-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackFormContainerComponent implements OnInit, OnDestroy {
  @ViewChild('feedbackForm') feedbackForm: FeedbackFormComponent;
  private destroySubject: Subject<null> = new Subject();
  protected isLoading: boolean;
  constructor(private cdr: ChangeDetectorRef, private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.subscribeToResetForm();
    this.subscribeToLoading();
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }

  private subscribeToResetForm(): void {
    this.feedbackService
      .getClearFormStream$()
      .pipe(takeUntil(this.destroySubject))
      .subscribe(() => {
        this.resetForm();
        this.cdr.markForCheck();
      });
  }

  private subscribeToLoading(): void {
    this.feedbackService
      .getFeedbackIsLoading()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
        this.cdr.markForCheck();
      });
  }

  protected handlerSubmitForm(data: IFeedbackData) {
    this.feedbackService.submitForm(data);
  }

  private resetForm() {
    this.feedbackForm.resetForm();
  }
}
