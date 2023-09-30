import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryPaymentRoutingModule } from './delivery-payment.routing.module';
import { BreadcrumbsModule } from 'src/app/components/breadcrumbs/breadcrumbs.module';
import { DeliveryPaymentComponent } from './delivery-payment.component';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DeliveryPaymentComponent],
  imports: [
    CommonModule,
    RouterModule,
    DeliveryPaymentRoutingModule,
    BreadcrumbsModule,
    NgxMaskPipe
  ],
  exports: [DeliveryPaymentComponent],
  providers: [
    provideNgxMask({
      validation: false
    })
  ]
})
export class DeliveryPaymentModule {}
