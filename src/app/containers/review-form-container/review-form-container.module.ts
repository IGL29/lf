import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewFormContainerComponent } from './review-form-container.component';
import { ReviewFormModule } from 'src/app/components/review-form/review-form.module';

@NgModule({
  declarations: [ReviewFormContainerComponent],
  imports: [CommonModule, ReviewFormModule],
  exports: [ReviewFormContainerComponent]
})
export class ReviewFormContainerModule {}
