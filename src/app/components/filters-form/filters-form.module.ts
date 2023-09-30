import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersFormComponent } from './filters-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RangeModule } from '../range/range.module';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { ForEntriesModule } from 'src/app/directives/for-entries/for-entries.module';
import { ProductFeaturesModule } from 'src/app/pipes/product-features/product-features.module';
import { ProductColorNameModule } from 'src/app/pipes/product-color-name/product-color-name.module';
import { ProductFormatNameModule } from 'src/app/pipes/product-format-name/product-format-name.module';
import { ProductLightNameModule } from 'src/app/pipes/product-light-name/product-light-name.module';
import { ProductFlowerNameModule } from 'src/app/pipes/product-flower-name/product-flower-name.module';
import { ProductPriceNameModule } from 'src/app/pipes/product-price-name/product-price-name.module';
import { UiButtonModule } from 'src/app/directives/ui/ui-button/ui-button.module';

@NgModule({
  declarations: [FiltersFormComponent],
  imports: [
    CommonModule,
    UiButtonModule,
    ReactiveFormsModule,
    RangeModule,
    CheckboxModule,
    RangeModule,
    ForEntriesModule,
    ProductFeaturesModule,
    ProductColorNameModule,
    ProductFormatNameModule,
    ProductLightNameModule,
    ProductFlowerNameModule,
    ProductPriceNameModule
  ],
  exports: [FiltersFormComponent]
})
export class FiltersFormModule {}
