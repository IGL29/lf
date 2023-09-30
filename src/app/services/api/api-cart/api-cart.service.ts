import { Injectable } from '@angular/core';
import { CartStorageService, Cart, ICartItem } from '../../cart-storage/cart-storage.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCartService {
  constructor(private cartStorageService: CartStorageService) {}

  public getProducts(): Observable<Cart> {
    return of(this.cartStorageService.getProducts());
  }

  public addProduct(cartItem: ICartItem): Observable<Cart> {
    return of(this.cartStorageService.addProduct(cartItem));
  }

  public deleteProduct(id: number): Observable<Cart> {
    return of(this.cartStorageService.deleteProduct(id));
  }

  public changeProductCount(id: number, count: number): Observable<Cart> {
    return of(this.cartStorageService.replaceProductCount(id, count));
  }

  public clearAll(): Observable<Cart> {
    return of(this.cartStorageService.clearAll());
  }
}
