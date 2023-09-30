import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFilterComponent } from './category-filter.component';
import { UiButtonModule } from 'src/app/directives/ui/ui-button/ui-button.module';

@NgModule({
  declarations: [CategoryFilterComponent],
  imports: [CommonModule, UiButtonModule],
  exports: [CategoryFilterComponent]
})
export class CategoryFilterModule {}
