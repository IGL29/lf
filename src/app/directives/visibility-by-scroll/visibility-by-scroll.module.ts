import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisibilityByScrollDirective } from './visibility-by-scroll.directive';

@NgModule({
  declarations: [VisibilityByScrollDirective],
  imports: [CommonModule],
  exports: [VisibilityByScrollDirective]
})
export class VisibilityByScrollModule {}
