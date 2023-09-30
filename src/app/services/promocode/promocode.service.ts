import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export const PROMOCODE = {
  'SALE-10': 100,
  'SALE-20': 200,
  SALE: 50
};

@Injectable({
  providedIn: 'root'
})
export class PromocodeService {
  private promocodeSubject = new Subject<number>();
  private promocodeStream$ = this.promocodeSubject.asObservable();

  public getDiscount<T extends string = keyof typeof PROMOCODE>(promocode: T): void {
    if (
      typeof promocode !== 'undefined' &&
      promocode in PROMOCODE &&
      (promocode === 'SALE-10' || promocode === 'SALE-20' || promocode === 'SALE')
    ) {
      this.promocodeSubject.next((PROMOCODE as Record<typeof promocode, number>)[promocode]);
      return;
    }
    this.promocodeSubject.next(0);
  }

  get promocodeDiscount(): Observable<number> {
    return this.promocodeStream$;
  }
}
