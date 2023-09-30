import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { BreadcrumbsModule } from 'src/app/components/breadcrumbs/breadcrumbs.module';
import { ProductComponent } from './product.component';
import { PriceModule } from 'src/app/components/price/price.module';
import { CounterModule } from 'src/app/components/counter/counter.module';
import { DeliveryComponent } from 'src/app/page-components/product/delivery/delivery.component';
import { TabsModule } from 'src/app/components/tabs/tabs.module';
import { TabModule } from 'src/app/components/tab/tab.module';
import { SliderModule } from 'src/app/components/slider/slider.module';
import { IconModule } from 'src/app/components/icon/icon.module';
import { ReviewsModule } from 'src/app/page-components/product/reviews/reviews.module';
import { ErrorBlockModule } from 'src/app/components/error-block/error-block.module';
import { RouterModule } from '@angular/router';
import { CategoryNameModule } from 'src/app/pipes/category-name/category-name.module';
import { ProductsOfferContainerModule } from 'src/app/containers/products-offer-container/products-offer-container.module';
import { LoaderModule } from '~components/loader/loader.module';
import { SlideModule } from '~components/slide/slide.module';
import { ImageUploadStatusModule } from 'src/app/directives/image-upload-status/image-upload-status.module';
import { UiButtonModule } from 'src/app/directives/ui/ui-button/ui-button.module';

@NgModule({
  declarations: [ProductComponent, DeliveryComponent],
  imports: [
    CommonModule,
    BreadcrumbsModule,
    ProductsOfferContainerModule,
    PriceModule,
    CounterModule,
    UiButtonModule,
    TabsModule,
    TabModule,
    SliderModule,
    IconModule,
    ReviewsModule,
    LoaderModule,
    ErrorBlockModule,
    RouterModule,
    CategoryNameModule,
    SlideModule,
    ImageUploadStatusModule,
    NgOptimizedImage
  ],
  exports: [ProductComponent]
})
export class ProductModule {}
