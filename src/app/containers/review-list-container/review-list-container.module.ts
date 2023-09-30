import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewListContainerComponent } from './review-list-container.component';
import { ReviewListModule } from 'src/app/components/review-list/review-list.module';

@NgModule({
  declarations: [ReviewListContainerComponent],
  imports: [CommonModule, ReviewListModule],
  exports: [ReviewListContainerComponent]
})
export class ReviewListContainerModule {}
