import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchingResultsComponent } from './searching-results.component';
import { ProductListCardModule } from 'src/app/components/product-list-card/product-list-card.module';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';
import { RouterModule } from '@angular/router';
import { IconModule } from '~components/icon/icon.module';
import { ButtonScrollModule } from 'src/app/directives/button-scroll/button-scroll.module';
import { UiButtonModule } from 'src/app/directives/ui/ui-button/ui-button.module';

@NgModule({
  declarations: [SearchingResultsComponent],
  imports: [
    CommonModule,
    ProductListCardModule,
    ProductCardModule,
    UiButtonModule,
    RouterModule,
    IconModule,
    ButtonScrollModule
  ],
  exports: [SearchingResultsComponent]
})
export class SearchingResultsModule {}
