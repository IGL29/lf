import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { HeroComponent } from 'src/app/page-components/main/hero/hero.component';
import { HowToOrderComponent } from 'src/app/page-components/main/how-to-order/how-to-order.component';
import { PopularComponent } from 'src/app/page-components/main/popular/popular.component';
import { QuestionsSectionComponent } from 'src/app/page-components/main/questions-section/questions-section.component';
import { SocialSectionComponent } from 'src/app/page-components/main/social-section/social-section.component';
import { SpecialComponent } from 'src/app/page-components/main/special/special.component';
import { CatalogComponent } from 'src/app/page-components/main/catalog/catalog.component';
import { FormsModule } from '@angular/forms';
import { IconModule } from 'src/app/components/icon/icon.module';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';
import { SliderModule } from 'src/app/components/slider/slider.module';
import { GetWordModule } from 'src/app/pipes/get-word/get-word.module';
import { RouterModule } from '@angular/router';
import { ForEntriesModule } from 'src/app/directives/for-entries/for-entries.module';
import { FeedbackFormContainerModule } from 'src/app/containers/feedback-form-container/feedback-form-container.module';
import { ProductsOfferContainerModule } from 'src/app/containers/products-offer-container/products-offer-container.module';
import { ParallaxModule } from 'src/app/directives/parallax/parallax.module';
import { IntersectionModule } from 'src/app/directives/intersection/intersection.module';
import { ProductListCardModule } from 'src/app/components/product-list-card/product-list-card.module';
import { UiButtonModule } from 'src/app/directives/ui/ui-button/ui-button.module';

@NgModule({
  declarations: [
    MainComponent,
    HeroComponent,
    CatalogComponent,
    PopularComponent,
    HowToOrderComponent,
    SpecialComponent,
    QuestionsSectionComponent,
    SocialSectionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UiButtonModule,
    ForEntriesModule,
    GetWordModule,
    IconModule,
    ProductCardModule,
    SliderModule,
    FormsModule,
    FeedbackFormContainerModule,
    ProductsOfferContainerModule,
    ParallaxModule,
    IntersectionModule,
    ProductListCardModule,
    ProductCardModule
  ],
  exports: [MainComponent]
})
export class MainModule {}
