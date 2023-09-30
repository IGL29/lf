import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsOfferContainerComponent } from './products-offer-container.component';
import { ProductsSliderModule } from 'src/app/components/products-slider/products-slider.module';
import { ProductListCardModule } from 'src/app/components/product-list-card/product-list-card.module';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';

@NgModule({
  declarations: [ProductsOfferContainerComponent],
  imports: [CommonModule, ProductsSliderModule, ProductListCardModule, ProductCardModule],
  exports: [ProductsOfferContainerComponent]
})
export class ProductsOfferContainerModule {}
