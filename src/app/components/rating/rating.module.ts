import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './rating.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RatingComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [RatingComponent]
})
export class RatingModule {}
