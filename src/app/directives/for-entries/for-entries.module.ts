import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ForEntriesDirective } from './for-entries.directive';

@NgModule({
  declarations: [ForEntriesDirective],
  imports: [CommonModule],
  exports: [ForEntriesDirective]
})
export class ForEntriesModule {}
