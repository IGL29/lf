import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortingContainerComponent } from './sorting-container.component';
import { SortingModule } from 'src/app/components/sorting/sorting.module';

@NgModule({
  declarations: [SortingContainerComponent],
  imports: [CommonModule, SortingModule],
  exports: [SortingContainerComponent],
})
export class SortingContainerModule {}
