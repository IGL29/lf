import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeComponent } from './range.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RangeComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [RangeComponent],
})
export class RangeModule {}
