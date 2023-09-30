import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private deliveryPrice = {
    courier: 400,
    pickup: 0
  };

  public getPrice(method: 'courier' | 'pickup'): number {
    if (method in this.deliveryPrice) {
      return this.deliveryPrice[method];
    }
    return 0;
  }
}
