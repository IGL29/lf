import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentSuccessfulRoutingModule } from './order-successful.routing.module';
import { OrderSuccessfulComponent } from './order-successful.component';

@NgModule({
  declarations: [OrderSuccessfulComponent],
  imports: [CommonModule, PaymentSuccessfulRoutingModule],
  exports: [OrderSuccessfulComponent]
})
export class PaymentSuccessfulModule {}
