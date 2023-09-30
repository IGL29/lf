import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsModule } from 'src/app/components/breadcrumbs/breadcrumbs.module';
import { OrderComponent } from './order.component';
import { ProductItemModule } from 'src/app/components/product-item/product-item.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'src/app/components/radio-button/radio-button.module';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { PromocodeFieldContainerModule } from 'src/app/containers/promocode-field-container/promocode-field-container.module';
import { LoaderModule } from 'src/app/components/loader/loader.module';
import { ErrorFieldModule } from '~components/error-field/error-field.module';
import { EmptyModule } from 'src/app/directives/validators/empty.module';
import { UiButtonModule } from 'src/app/directives/ui/ui-button/ui-button.module';

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    BreadcrumbsModule,
    UiButtonModule,
    PromocodeFieldContainerModule,
    ProductItemModule,
    ReactiveFormsModule,
    RadioButtonModule,
    NgxMaskDirective,
    RouterModule,
    LoaderModule,
    ErrorFieldModule,
    EmptyModule
  ],
  exports: [OrderComponent],

  providers: [
    provideNgxMask({
      validation: false
    })
  ]
})
export class OrderModule {}
