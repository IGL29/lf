import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { INotifyWithId } from 'src/app/store/notifications/notifications.reducer';
import { enterLeaveAnimation } from '~animations/enter-leave-animation';
import { expandAnimation } from '~animations/expand-animation';
import { fadeAnimation } from '~animations/fade-animation';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  animations: [enterLeaveAnimation, fadeAnimation, expandAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsComponent {
  protected isNotificationExists = false;
  protected isVisibleRemoveButton = false;
  protected notificationsList: INotifyWithId[] = [];
  @Input() set notifications(notifications: INotifyWithId[]) {
    this.notificationsList = notifications;
    this.isVisibleRemoveButton = notifications.length > 1;
    this.isNotificationExists = !!notifications.length;
  }
  @Output() emitHide: EventEmitter<INotifyWithId['id']> = new EventEmitter();
  @Output() emitHideAll: EventEmitter<void> = new EventEmitter();

  protected handlerCloseNotify(id: INotifyWithId['id']): void {
    this.emitHide.emit(id);
  }

  protected handlerHideAll(): void {
    this.emitHideAll.emit();
  }

  protected trackById(_: number, notify: INotifyWithId): INotifyWithId['id'] {
    return notify.id;
  }
}
