import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductContainerComponent } from './product-container.component';
import { ProductModule } from './component/product.module';
import { ProductContainerRoutingModule } from './product-container.routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { productStore } from './store/product';

@NgModule({
  declarations: [ProductContainerComponent],
  imports: [
    CommonModule,
    ProductContainerRoutingModule,
    ProductModule,
    StoreModule.forFeature(productStore.FEATURE_KEY, productStore.productReducer),
    EffectsModule.forFeature([productStore.ProductEffects])
  ],
  exports: [ProductContainerComponent]
})
export class ProductContainerModule {}
