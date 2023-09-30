import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ICorporateUser } from '~pages/corporate-clients/component/types';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class CorporateClientsService {
  private clearFormSubject: Subject<true> = new Subject();
  private clearFormStream$: Observable<true> = this.clearFormSubject.asObservable();

  constructor(private StoreService: StoreService) {}

  public submitForm(data: ICorporateUser): void {
    this.StoreService.dispatchCorporateClients(data);
  }

  get clearFormStream(): Observable<true> {
    return this.clearFormStream$;
  }

  public doClearForm(): void {
    this.clearFormSubject.next(true);
  }

  public getRequestLoading(): Observable<boolean> {
    return this.StoreService.corporateLoading();
  }
}
