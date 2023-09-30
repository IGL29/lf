import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifyComponent } from './notify.component';

@NgModule({
  declarations: [NotifyComponent],
  imports: [CommonModule],
  exports: [NotifyComponent]
})
export class NotifyModule {}
