import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { NotifyModule } from '~components/notify/notify.module';
import { UiButtonModule } from 'src/app/directives/ui/ui-button/ui-button.module';

@NgModule({
  declarations: [NotificationsComponent],
  imports: [CommonModule, NotifyModule, UiButtonModule],
  exports: [NotificationsComponent]
})
export class NotificationsModule {}
