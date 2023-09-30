import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackFormContainerComponent } from './feedback-form-container.component';
import { FeedbackFormModule } from '../../components/feedback-form/feedback-form.module';

@NgModule({
  declarations: [FeedbackFormContainerComponent],
  imports: [CommonModule, FeedbackFormModule],
  exports: [FeedbackFormContainerComponent]
})
export class FeedbackFormContainerModule {}
