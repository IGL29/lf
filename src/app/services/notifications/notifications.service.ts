import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INotifyWithId } from 'src/app/store/notifications/notifications.reducer';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(private StoreService: StoreService) {}

  public getNotifications(): Observable<INotifyWithId[] | []> {
    return this.StoreService.getNotifications();
  }

  public remove(id: INotifyWithId['id']): void {
    this.StoreService.dispatchRemoveNotify(id);
  }

  public removeAll(): void {
    this.StoreService.dispatchRemoveNotifyAll();
  }
}
