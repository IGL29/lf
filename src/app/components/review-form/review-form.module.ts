import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewFormComponent } from './review-form.component';
import { LoaderModule } from '../loader/loader.module';
import { RatingModule } from '../rating/rating.module';
import { ErrorBlockModule } from '../error-block/error-block.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorFieldModule } from '~components/error-field/error-field.module';
import { UiButtonModule } from 'src/app/directives/ui/ui-button/ui-button.module';

@NgModule({
  declarations: [ReviewFormComponent],
  imports: [
    CommonModule,
    LoaderModule,
    RatingModule,
    ErrorBlockModule,
    UiButtonModule,
    ReactiveFormsModule,
    ErrorFieldModule
  ],
  exports: [ReviewFormComponent]
})
export class ReviewFormModule {}
