import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorBlockComponent } from './error-block.component';
import { UiButtonModule } from 'src/app/directives/ui/ui-button/ui-button.module';

@NgModule({
  declarations: [ErrorBlockComponent],
  imports: [CommonModule, UiButtonModule],
  exports: [ErrorBlockComponent]
})
export class ErrorBlockModule {}
