import { enterLeaveAnimation } from '~animations/enter-leave-animation';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { expandAnimation } from 'src/app/animations/expand-animation';
import { fadeAnimation } from 'src/app/animations/fade-animation';
import { IEmitAddToCart, IEmitChangeProductCount } from './types';
import { IProduct } from '~types/product';
import { Cart, ICartItem } from 'src/app/services/cart-storage/cart-storage.service';

@Component({
  selector: 'app-cart-menu',
  templateUrl: './cart-menu.component.html',
  styleUrls: ['./cart-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation, expandAnimation, enterLeaveAnimation]
})
export class CartMenuComponent {
  private _inCartProducts: Cart = [];
  protected isCartNotEmpty: boolean;
  protected _offerProducts: IProduct[] = [];
  protected minProductCount = 1;

  get inCartProducts(): Cart {
    return this._inCartProducts;
  }
  @Input() set inCartProducts(inCartProducts: Cart) {
    this._inCartProducts = inCartProducts;
    this.isCartNotEmpty = 'length' in inCartProducts && inCartProducts.length !== 0;
  }
  @Input() cartPrice: number;
  @Input() set offerProducts(offerProducts: IProduct[]) {
    this._offerProducts = offerProducts.slice(0, 2);
  }
  @Input() isOfferProductsLoading: boolean;
  @Output() emitAddToCart: EventEmitter<IEmitAddToCart> = new EventEmitter();
  @Output() emitChangeProductCount: EventEmitter<IEmitChangeProductCount> = new EventEmitter();
  @Output() emitCloseMenu: EventEmitter<void> = new EventEmitter();
  @Output() emitDeleteFromCart: EventEmitter<number> = new EventEmitter();

  protected onChangeProductCount(product: IProduct, count: number): void {
    if (count < 1) {
      return;
    }
    this.emitChangeProductCount.emit({ id: product.id, count });
  }

  protected deleteFromCart(id: number): void {
    this.emitDeleteFromCart.emit(id);
  }

  protected addToCart(product: IProduct): void {
    this.emitAddToCart.emit({ product, count: 1 });
  }

  protected trackByProductId(_: number, cartItem: ICartItem): number {
    return cartItem.product.id;
  }

  public closeMenu(): void {
    this.emitCloseMenu.emit();
  }
}
