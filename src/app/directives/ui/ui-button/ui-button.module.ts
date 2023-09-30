import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiButtonDirective } from './ui-button.directive';

@NgModule({
  declarations: [UiButtonDirective],
  imports: [CommonModule],
  exports: [UiButtonDirective]
})
export class UiButtonModule {}
