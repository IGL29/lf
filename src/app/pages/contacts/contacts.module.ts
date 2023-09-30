import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsRoutingModule } from './contacts.routing.module';
import { BreadcrumbsModule } from 'src/app/components/breadcrumbs/breadcrumbs.module';
import { ContactsComponent } from './contacts.component';
import { FeedbackFormContainerModule } from 'src/app/containers/feedback-form-container/feedback-form-container.module';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { LoaderModule } from '~components/loader/loader.module';

@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    BreadcrumbsModule,
    NgxMaskPipe,
    FeedbackFormContainerModule,
    LoaderModule
  ],
  exports: [ContactsComponent],
  providers: [
    provideNgxMask({
      validation: false
    })
  ]
})
export class ContactsModule {}
