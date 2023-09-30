import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cartStore } from 'src/app/store/cart';
import { IProduct } from '~types/product';
import { ICartItem } from '../cart-storage/cart-storage.service';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private StoreService: StoreService) {}

  public requestCart(): void {
    this.StoreService.dispatchRequestCart();
  }

  public getCountInCart(): Observable<number> {
    return this.StoreService.getCountInCart();
  }

  public getCart(): Observable<cartStore.IState['inCart']> {
    return this.StoreService.getCart();
  }

  public getPrice(): Observable<number> {
    return this.StoreService.getCartPrice();
  }

  public getDiscount(): Observable<number> {
    return this.StoreService.getCartDiscount();
  }

  public addToCart(cartItem: ICartItem): void {
    this.StoreService.dispatchPostToCart(cartItem);
  }

  public deleteFromCart(id: IProduct['id']): void {
    this.StoreService.dispatchDeleteFromCart({ id });
  }

  public changeProductCount(id: number, count: number): void {
    this.StoreService.dispatchChangeProductCount({ id, count });
  }

  public clearAll(): void {
    this.StoreService.dispatchClearCart();
  }
}
