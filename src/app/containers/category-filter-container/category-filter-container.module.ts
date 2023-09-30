import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from '~components/accordion/accordion.module';
import { CategoryFilterModule } from '~components/category-filter/category-filter.module';
import { CategoryFilterContainerComponent } from './category-filter-container.component';
import { UiButtonModule } from 'src/app/directives/ui/ui-button/ui-button.module';

@NgModule({
  declarations: [CategoryFilterContainerComponent],
  imports: [CommonModule, AccordionModule, UiButtonModule, CategoryFilterModule],
  exports: [CategoryFilterContainerComponent]
})
export class CategoryFilterContainerModule {}
