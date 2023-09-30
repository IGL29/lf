import { Injectable } from '@angular/core';
import { IProduct } from '~types/product';
import { StorageService } from '../storage/storage.service';

export interface ICartItem {
  product: IProduct;
  count: number;
}
export type Cart = ICartItem[];

@Injectable({
  providedIn: 'root'
})
export class CartStorageService {
  private readonly key = <const>'cart';

  constructor(private storageService: StorageService) {}

  public getProducts(): Cart {
    const cartData = this.storageService.getItem(this.key);
    return cartData && Array.isArray(cartData) ? cartData : this.createCart();
  }

  public addProduct({ product, count }: ICartItem): Cart {
    const cart: Cart = this.getProducts();

    if (cart.length) {
      if (count > 0) {
        return this.addToExistingCart(cart, { product, count });
      }
      this.deleteFromStorage(cart, product.id);
    }
    return this.addToEmptyCart(cart, { product, count });
  }

  public replaceProductCount(id: number, count: number): Cart {
    const cart = this.getProducts();

    if (cart.length) {
      const itemindex = cart.findIndex((cartItem) => cartItem.product.id === id);

      if (itemindex === -1) {
        return cart;
      }
      cart[itemindex].count = count;
      this.storageService.setItem(this.key, cart);
    }
    return cart;
  }

  public deleteProduct(id: number): Cart {
    const cart: Cart = this.getProducts();

    if (cart.length) {
      return this.deleteFromStorage(cart, id);
    }
    return cart;
  }

  public clearAll(): Cart {
    this.storageService.setItem(this.key, []);
    return [];
  }

  private createCartItem(product: IProduct, count: number) {
    return { product, count };
  }

  private createCart(): Cart {
    this.storageService.setItem(this.key, []);
    return [];
  }

  private addToEmptyCart(cart: Cart, { product, count }: ICartItem): Cart {
    cart.push({ product, count });
    this.storageService.setItem(this.key, cart);
    return cart;
  }

  private addToExistingCart(cart: Cart, { product, count }: ICartItem): Cart {
    const productIndex: number = cart.findIndex(
      (itemInCart) => itemInCart.product.id === product.id
    );
    if (productIndex === -1) {
      cart.push(this.createCartItem(product, count));
    } else {
      cart[productIndex].count = Number(cart[productIndex].count) + count;
    }
    this.storageService.setItem(this.key, cart);
    return cart;
  }

  private deleteFromStorage(cart: Cart, id: number): Cart {
    const productIndex = cart.findIndex((itemInCart) => itemInCart.product.id === id);

    if (productIndex !== -1) {
      cart.splice(productIndex, 1);
    }

    this.storageService.setItem(this.key, cart);
    return cart;
  }
}
