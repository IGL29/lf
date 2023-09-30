import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSliderComponent } from './products-slider.component';
import { ProductCardModule } from '../product-card/product-card.module';
import { SliderModule } from '../slider/slider.module';
import { IconModule } from '../icon/icon.module';
import { RouterModule } from '@angular/router';
import { LoaderModule } from '../loader/loader.module';
import { SlideModule } from '~components/slide/slide.module';
import { UiButtonModule } from 'src/app/directives/ui/ui-button/ui-button.module';

@NgModule({
  declarations: [ProductsSliderComponent],
  imports: [
    CommonModule,
    RouterModule,
    ProductCardModule,
    SliderModule,
    IconModule,
    UiButtonModule,
    LoaderModule,
    SlideModule
  ],
  exports: [ProductsSliderComponent]
})
export class ProductsSliderModule {}
