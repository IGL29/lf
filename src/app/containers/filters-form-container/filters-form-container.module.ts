import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersFormContainerComponent } from './filters-form-container.component';
import { FiltersFormModule } from '~components/filters-form/filters-form.module';

@NgModule({
  declarations: [FiltersFormContainerComponent],
  imports: [CommonModule, FiltersFormModule],
  exports: [FiltersFormContainerComponent]
})
export class FiltersFormContainerModule {}
