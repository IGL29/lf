import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { INotifyWithId } from 'src/app/store/notifications/notifications.reducer';

@Component({
  selector: 'app-notifications-container',
  templateUrl: './notifications-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsContainerComponent {
  protected notifications$: Observable<INotifyWithId[]> =
    this.notificationsService.getNotifications();

  constructor(private notificationsService: NotificationsService) {}

  protected handlerNotifyClose(id: INotifyWithId['id']) {
    this.notificationsService.remove(id);
  }

  protected handlerNotifyCloseAll(): void {
    this.notificationsService.removeAll();
  }
}
