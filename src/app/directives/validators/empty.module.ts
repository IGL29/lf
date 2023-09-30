import { NgModule } from '@angular/core';
import { EmptyDirective } from './empty.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [EmptyDirective],
  imports: [CommonModule],
  exports: [EmptyDirective],
})
export class EmptyModule {}
