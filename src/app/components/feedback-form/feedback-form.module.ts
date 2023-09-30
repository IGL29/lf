import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackFormComponent } from './feedback-form.component';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { LoaderModule } from '../loader/loader.module';
import { EmptyModule } from 'src/app/directives/validators/empty.module';
import { ErrorFieldModule } from '~components/error-field/error-field.module';
import { FieldWrapperModule } from '~components/field-wrapper/field-wrapper.module';
import { UiButtonModule } from 'src/app/directives/ui/ui-button/ui-button.module';

@NgModule({
  declarations: [FeedbackFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    UiButtonModule,
    NgxMaskDirective,
    LoaderModule,
    EmptyModule,
    ErrorFieldModule,
    FieldWrapperModule
  ],
  exports: [FeedbackFormComponent],
  providers: [
    provideNgxMask({
      validation: false
    })
  ]
})
export class FeedbackFormModule {}
