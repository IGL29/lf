import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { StoreService } from '../store/store.service';
import { IOrderData } from '~pages/order/component/types';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private resetFormSubject = new Subject<true>();
  private resetFormStream = this.resetFormSubject.asObservable();

  constructor(private store: StoreService) {}

  public doClearForm(): void {
    this.resetFormSubject.next(true);
  }

  public getResetFormStream(): Observable<true> {
    return this.resetFormStream;
  }

  public getOrderLoading(): Observable<boolean> {
    return this.store.orderLoading();
  }

  public postOrder(data: IOrderData): void {
    this.store.dispatchOrder(data);
  }
}
