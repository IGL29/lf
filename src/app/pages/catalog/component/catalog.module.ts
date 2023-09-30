import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';
import { CatalogComponent } from './catalog.component';
import { CheckboxModule } from 'src/app/components/checkbox/checkbox.module';
import { BreadcrumbsModule } from 'src/app/components/breadcrumbs/breadcrumbs.module';
import { ButtonScrollModule } from 'src/app/directives/button-scroll/button-scroll.module';
import { IconModule } from 'src/app/components/icon/icon.module';
import { DropdownModule } from 'src/app/components/dropdown/dropdown.module';
import { ProductListCardModule } from 'src/app/components/product-list-card/product-list-card.module';
import { ForEntriesModule } from 'src/app/directives/for-entries/for-entries.module';
import { SortingContainerModule } from 'src/app/containers/sorting-container/sorting-container.module';
import { AccordionModule } from 'src/app/components/accordion/accordion.module';
import { CategoryFilterContainerModule } from 'src/app/containers/category-filter-container/category-filter-container.module';
import { FiltersFormContainerModule } from 'src/app/containers/filters-form-container/filters-form-container.module';
import { UiButtonModule } from 'src/app/directives/ui/ui-button/ui-button.module';

@NgModule({
  declarations: [CatalogComponent],
  imports: [
    CommonModule,
    ProductListCardModule,
    ProductCardModule,
    UiButtonModule,
    CheckboxModule,
    FiltersFormContainerModule,
    BreadcrumbsModule,
    ButtonScrollModule,
    IconModule,
    ForEntriesModule,
    DropdownModule,
    RouterModule,
    AccordionModule,
    CategoryFilterContainerModule,
    SortingContainerModule
  ],
  exports: [CatalogComponent]
})
export class CatalogModule {}
