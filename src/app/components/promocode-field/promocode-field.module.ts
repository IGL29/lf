import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromocodeFieldComponent } from './promocode-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmptyModule } from 'src/app/directives/validators/empty.module';
import { UiButtonModule } from 'src/app/directives/ui/ui-button/ui-button.module';

@NgModule({
  declarations: [PromocodeFieldComponent],
  imports: [CommonModule, UiButtonModule, FormsModule, ReactiveFormsModule, EmptyModule],
  exports: [PromocodeFieldComponent]
})
export class PromocodeFieldModule {}
