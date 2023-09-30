import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review.component';
import { RatingModule } from '../rating/rating.module';

@NgModule({
  declarations: [ReviewComponent],
  imports: [CommonModule, RatingModule],
  exports: [ReviewComponent],
})
export class ReviewModule {}
