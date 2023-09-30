import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReviewsComponent } from './reviews.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'src/app/components/rating/rating.module';
import { StoreModule } from '@ngrx/store';
import { commentsStore } from 'src/app/pages/product/store/comments';
import { EffectsModule } from '@ngrx/effects';
import { ErrorBlockModule } from 'src/app/components/error-block/error-block.module';
import { LoaderModule } from 'src/app/components/loader/loader.module';
import { RouterModule } from '@angular/router';
import { ReviewListContainerModule } from 'src/app/containers/review-list-container/review-list-container.module';
import { ReviewFormContainerModule } from 'src/app/containers/review-form-container/review-form-container.module';
import { UiButtonModule } from 'src/app/directives/ui/ui-button/ui-button.module';

@NgModule({
  declarations: [ReviewsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiButtonModule,
    RatingModule,
    ErrorBlockModule,
    LoaderModule,
    RouterModule,
    ReviewListContainerModule,
    ReviewFormContainerModule,
    StoreModule.forFeature(commentsStore.FEATURE_KEY, commentsStore.commentsReducer),
    EffectsModule.forFeature([commentsStore.CommentsEffects])
  ],
  exports: [ReviewsComponent]
})
export class ReviewsModule {}
