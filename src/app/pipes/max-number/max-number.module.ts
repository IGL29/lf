import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaxNumberPipe } from './max-number.pipe';

@NgModule({
  declarations: [MaxNumberPipe],
  imports: [CommonModule],
  exports: [MaxNumberPipe],
})
export class MaxNumberModule {}
