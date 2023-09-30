import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewListComponent } from './review-list.component';
import { ErrorBlockModule } from '../error-block/error-block.module';
import { ReviewModule } from '../review/review.module';
import { LoaderModule } from '../loader/loader.module';

@NgModule({
  declarations: [ReviewListComponent],
  imports: [CommonModule, ErrorBlockModule, ReviewModule, LoaderModule],
  exports: [ReviewListComponent]
})
export class ReviewListModule {}
