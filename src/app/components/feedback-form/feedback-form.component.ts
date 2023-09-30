import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IFeedbackData } from './types';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackFormComponent {
  private form: NgForm;
  @Input() isLoading: boolean;
  @Output() emitFormSubmit: EventEmitter<IFeedbackData> = new EventEmitter();

  public handlerQuestionSubmit(form: NgForm): void {
    if (form.invalid || this.isLoading) {
      return;
    }
    this.emitFormSubmit.emit(form.value);
    this.form = form;
  }

  public resetForm() {
    this.form.resetForm();
  }
}
