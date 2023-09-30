import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { NgModule } from '@angular/core';
import { OutsideFocusModule } from 'src/app/directives/outside-focus/outside-focus.module';
import { OutsideClickModule } from 'src/app/directives/outside-click/outside-click.module';

@NgModule({
  declarations: [DropdownComponent],
  imports: [CommonModule, OutsideFocusModule, OutsideClickModule],
  exports: [DropdownComponent],
})
export class DropdownModule {}
