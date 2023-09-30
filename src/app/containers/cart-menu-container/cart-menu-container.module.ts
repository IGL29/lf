import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartMenuContainerComponent } from './cart-menu-container.component';
import { CartMenuModule } from '~components/cart-menu/cart-menu.module';

@NgModule({
  declarations: [CartMenuContainerComponent],
  imports: [CommonModule, CartMenuModule],
  exports: [CartMenuContainerComponent]
})
export class CartMenuContainerModule {}
