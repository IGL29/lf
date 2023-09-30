import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from '../store/store.service';
import { productsStore } from 'src/app/store/products';
import { productStore } from '~pages/product/store/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private StoreService: StoreService) {}

  public requestProducts(): void {
    this.StoreService.dispatchRequestProducts();
  }

  public requestProduct(id: number): void {
    this.StoreService.dispatchRequestProduct(id);
  }

  public getProducts(): Observable<productsStore.IState['products']> {
    return this.StoreService.getProducts();
  }

  public productsIsLoading(): Observable<productsStore.IState['isLoading']> {
    return this.StoreService.productsIsLoading();
  }

  public productsError(): Observable<productsStore.IState['error']> {
    return this.StoreService.productsError();
  }

  public getProduct(): Observable<productStore.IState['product']> {
    return this.StoreService.getProduct();
  }

  public getProductError(): Observable<productStore.IState['error']> {
    return this.StoreService.getProductError();
  }

  public productIsLoading(): Observable<productStore.IState['isLoading']> {
    return this.StoreService.productIsLoading();
  }

  public isHydrateProduct(): Observable<productStore.IState['isHydrateSuccess']> {
    return this.StoreService.isHydrateProduct();
  }
}
