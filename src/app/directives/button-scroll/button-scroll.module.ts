import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonScrollDirective } from './button-scroll.directive';

@NgModule({
  declarations: [ButtonScrollDirective],
  imports: [CommonModule],
  exports: [ButtonScrollDirective]
})
export class ButtonScrollModule {}
