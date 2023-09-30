import { NgModule } from '@angular/core';
import { CartMenuComponent } from './cart-menu.component';
import { CommonModule } from '@angular/common';
import { ProductItemModule } from '../product-item/product-item.module';
import { RouterModule } from '@angular/router';
import { LoaderModule } from '~components/loader/loader.module';
import { UiButtonModule } from 'src/app/directives/ui/ui-button/ui-button.module';

@NgModule({
  declarations: [CartMenuComponent],
  imports: [CommonModule, ProductItemModule, RouterModule, UiButtonModule, LoaderModule],
  exports: [CartMenuComponent]
})
export class CartMenuModule {}
