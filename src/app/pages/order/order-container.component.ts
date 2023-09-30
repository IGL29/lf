import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { OrderComponent } from './component/order.component';
import { Cart } from 'src/app/services/cart-storage/cart-storage.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import { Meta } from '@angular/platform-browser';
import { description } from './data/meta';
import { IOrderData } from './component/types';

@Component({
  selector: 'app-order-container',
  templateUrl: './order-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderContainerComponent implements OnInit {
  @ViewChild('orderComponent') orderComponent: OrderComponent;
  protected cart: Cart | null;
  protected cartPrice: number;
  protected cartDiscount: number;
  protected cartProductCount: number;

  constructor(
    private meta: Meta,
    private cartService: CartService,
    private orderService: OrderService
  ) {
    this.setMeta();
  }

  ngOnInit(): void {
    this.subscribeToCartPrice();
    this.subscribeToCartDiscount();
    this.subscribeToCart();
    this.subscribeToCountInCart();
  }

  private setMeta(): void {
    this.meta.addTag({
      name: 'description',
      content: description
    });
  }

  protected subscribeToCountInCart(): void {
    this.cartService.getCountInCart().subscribe((count) => (this.cartProductCount = count));
  }

  protected subscribeToCart(): void {
    this.cartService.getCart().subscribe((cart) => (this.cart = cart));
  }

  protected handlerSubmitOrderForm(formData: IOrderData): void {
    this.orderService.postOrder(formData);
  }

  private subscribeToCartPrice(): void {
    this.cartService.getPrice().subscribe((price) => (this.cartPrice = price));
  }

  private subscribeToCartDiscount(): void {
    this.cartService.getDiscount().subscribe((discount) => (this.cartDiscount = discount));
  }

  protected deleteFromCart(id: number): void {
    this.cartService.deleteFromCart(id);
  }

  protected productCountChange(payload: { id: number; count: number }): void {
    this.cartService.changeProductCount(payload.id, payload.count);
  }
}
