import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutsideFocusDirective } from './outside-focus.directive';

@NgModule({
  declarations: [OutsideFocusDirective],
  imports: [CommonModule],
  exports: [OutsideFocusDirective],
})
export class OutsideFocusModule {}
