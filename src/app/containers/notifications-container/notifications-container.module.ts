import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsContainerComponent } from './notifications-container.component';
import { NotificationsModule } from '~components/notifications/notifications.module';

@NgModule({
  declarations: [NotificationsContainerComponent],
  imports: [CommonModule, NotificationsModule],
  exports: [NotificationsContainerComponent]
})
export class NotificationsContainerModule {}
