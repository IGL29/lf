import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortingComponent } from './sorting.component';
import { DropdownModule } from '../dropdown/dropdown.module';

@NgModule({
  declarations: [SortingComponent],
  imports: [CommonModule, DropdownModule],
  exports: [SortingComponent],
})
export class SortingModule {}
