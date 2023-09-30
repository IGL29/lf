import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderContainerComponent } from './order-container.component';
import { OrderModule } from './component/order.module';
import { OrderContainerRoutingModule } from './order-container.routing.module';

@NgModule({
  declarations: [OrderContainerComponent],
  imports: [CommonModule, OrderModule, OrderContainerRoutingModule],
  exports: [OrderContainerComponent]
})
export class OrderContainerModule {}
