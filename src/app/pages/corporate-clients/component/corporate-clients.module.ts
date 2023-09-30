import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsModule } from 'src/app/components/breadcrumbs/breadcrumbs.module';
import { CorporateClientsComponent } from './corporate-clients.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { EmptyModule } from 'src/app/directives/validators/empty.module';
import { ErrorFieldModule } from '~components/error-field/error-field.module';
import { LoaderModule } from '~components/loader/loader.module';
import { UiButtonModule } from 'src/app/directives/ui/ui-button/ui-button.module';

@NgModule({
  declarations: [CorporateClientsComponent],
  imports: [
    CommonModule,
    BreadcrumbsModule,
    UiButtonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    RouterModule,
    EmptyModule,
    ErrorFieldModule,
    LoaderModule
  ],
  exports: [CorporateClientsComponent],
  providers: [provideNgxMask()]
})
export class CorporateClientsModule {}
