import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CATEGORY_NAME, EnumCategories, EnumFlower, FLOWER_NAME, IProduct } from '~types/product';
import { productStore } from '~pages/product/store/product';
import { ICartItem } from '../cart-storage/cart-storage.service';
import { CartService } from '../cart/cart.service';
import { ProductsService } from '../products/products.service';
import { MetaDefinition } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ProductContainerService {
  constructor(private productService: ProductsService, private cartService: CartService) {}

  public requestProduct(id: IProduct['id']) {
    this.productService.requestProduct(id);
  }

  public getProduct(): Observable<productStore.IState['product']> {
    return this.productService.getProduct();
  }

  public getProductError(): Observable<productStore.IState['error']> {
    return this.productService.getProductError();
  }

  public productIsLoading(): Observable<productStore.IState['isLoading']> {
    return this.productService.productIsLoading();
  }

  public addToCart(itemCart: ICartItem): void {
    this.cartService.addToCart(itemCart);
  }

  public isHydrateProduct(): Observable<productStore.IState['isHydrateSuccess']> {
    return this.productService.isHydrateProduct();
  }

  public getKeywordsMeta(product: IProduct): MetaDefinition {
    const categoriesWords = product.categories
      .map((category) => CATEGORY_NAME[EnumCategories[category]])
      .join(' ');
    const flowersWords = product.flowers.map((flower) => FLOWER_NAME[EnumFlower[flower]]).join(' ');

    return {
      name: 'keywords',
      content: `${product.title} ${categoriesWords} ${flowersWords}`
    };
  }
}
