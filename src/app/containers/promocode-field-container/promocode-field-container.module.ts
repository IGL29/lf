import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromocodeFieldModule } from '../../components/promocode-field/promocode-field.module';
import { PromocodeFieldContainerComponent } from './promocode-field-container.component';

@NgModule({
  declarations: [PromocodeFieldContainerComponent],
  imports: [CommonModule, PromocodeFieldModule],
  exports: [PromocodeFieldContainerComponent]
})
export class PromocodeFieldContainerModule {}
