import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import { PriceModule } from '../price/price.module';
import { RouterModule } from '@angular/router';
import { BadgeModule } from '~components/badge/badge.module';
import { ProductBadgeColorModule } from 'src/app/pipes/product-badge-color/product-badge-color.module';
import { ProductBadgeTextModule } from 'src/app/pipes/product-badge-text/product-badge-text.module';
import { ImageUploadStatusModule } from 'src/app/directives/image-upload-status/image-upload-status.module';
import { UiButtonModule } from 'src/app/directives/ui/ui-button/ui-button.module';

@NgModule({
  declarations: [ProductCardComponent],
  imports: [
    CommonModule,
    UiButtonModule,
    PriceModule,
    RouterModule,
    BadgeModule,
    ProductBadgeColorModule,
    ProductBadgeTextModule,
    ImageUploadStatusModule,
    NgOptimizedImage
  ],
  exports: [ProductCardComponent]
})
export class ProductCardModule {}
